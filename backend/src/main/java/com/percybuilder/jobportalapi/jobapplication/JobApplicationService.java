package com.percybuilder.jobportalapi.jobapplication;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.constants.AppConstants;
import com.percybuilder.jobportalapi.common.constants.CacheNames;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.job.Job;
import com.percybuilder.jobportalapi.job.JobRepository;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationRequest;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationResponse;
import com.percybuilder.jobportalapi.user.User;
import com.percybuilder.jobportalapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Transactional
    @LogExecution
    @CacheEvict(value = CacheNames.JOBS, allEntries = true)
    public JobApplicationResponse applyToJob(JobApplicationRequest request) {
        String currentUserEmail = getCurrentUserEmail();

        User candidate = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        Job job = jobRepository.findById(request.jobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", request.jobId()));

        if (!"OPEN".equalsIgnoreCase(job.getStatus())) {
            throw new IllegalArgumentException("You can only apply to open jobs");
        }

        boolean alreadyApplied = jobApplicationRepository.existsByCandidateEmailAndJobId(
                currentUserEmail,
                request.jobId()
        );

        if (alreadyApplied) {
            throw new IllegalArgumentException("You have already applied to this job");
        }

        JobApplication application = new JobApplication();
        application.setCandidate(candidate);
        application.setJob(job);
        application.setAppliedDate(LocalDate.now());
        application.setStatus(AppConstants.APPLICATION_STATUS_SUBMITTED);
        application.setCoverLetter(request.coverLetter());

        Integer currentApplicationsCount = job.getApplicationsCount() == null
                ? 0
                : job.getApplicationsCount();

        job.setApplicationsCount(currentApplicationsCount + 1);

        JobApplication savedApplication = jobApplicationRepository.save(application);

        return mapToJobApplicationResponse(savedApplication);
    }

    @Transactional
    @LogExecution
    @CacheEvict(value = CacheNames.JOBS, allEntries = true)
    public void withdrawApplication(Long jobId) {
        String currentUserEmail = getCurrentUserEmail();

        JobApplication application = jobApplicationRepository.findByCandidateEmailAndJobId(
                        currentUserEmail,
                        jobId
                )
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "jobId", jobId));

        application.setStatus(AppConstants.APPLICATION_STATUS_WITHDRAWN);

        Job job = application.getJob();
        Integer currentApplicationsCount = job.getApplicationsCount() == null
                ? 0
                : job.getApplicationsCount();

        if (currentApplicationsCount > 0) {
            job.setApplicationsCount(currentApplicationsCount - 1);
        }
    }

    @LogExecution
    public List<JobApplicationResponse> getMyApplications() {
        String currentUserEmail = getCurrentUserEmail();

        return jobApplicationRepository.findByCandidateEmailOrderByAppliedDateDesc(currentUserEmail)
                .stream()
                .map(this::mapToJobApplicationResponse)
                .toList();
    }

    private JobApplicationResponse mapToJobApplicationResponse(JobApplication application) {
        User candidate = application.getCandidate();
        Job job = application.getJob();

        return new JobApplicationResponse(
                application.getId(),
                candidate.getId(),
                candidate.getFullName(),
                candidate.getEmail(),
                job.getId(),
                job.getTitle(),
                job.getCompany().getName(),
                job.getLocation(),
                application.getStatus(),
                application.getAppliedDate(),
                application.getCoverLetter()
        );
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
}
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
import com.percybuilder.jobportalapi.profile.CandidateProfile;
import com.percybuilder.jobportalapi.profile.CandidateProfileRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private static final Set<String> EMPLOYER_APPLICATION_STATUSES = Set.of(
            "REVIEWED",
            "SHORTLISTED",
            "REJECTED"
    );


    @Transactional
    @LogExecution
    @CacheEvict(value = CacheNames.JOBS, allEntries = true)
    public JobApplicationResponse applyToJob(JobApplicationRequest request) {
        String currentUserEmail = getCurrentUserEmail();
        validateCandidateProfileIsReady(currentUserEmail);

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

    @LogExecution
    public List<JobApplicationResponse> getApplicationsForMyCompany() {
        Long companyId = getCurrentEmployerCompanyId();

        return jobApplicationRepository.findByJobCompanyIdOrderByAppliedDateDesc(companyId)
                .stream()
                .map(this::mapToJobApplicationResponse)
                .toList();
    }

    @LogExecution
    public List<JobApplicationResponse> getApplicationsForMyCompanyJob(Long jobId) {
        Long companyId = getCurrentEmployerCompanyId();

        return jobApplicationRepository
                .findByJobIdAndJobCompanyIdOrderByAppliedDateDesc(jobId, companyId)
                .stream()
                .map(this::mapToJobApplicationResponse)
                .toList();
    }

    @Transactional
    @LogExecution
    public JobApplicationResponse updateApplicationStatusForMyCompany(
            Long applicationId,
            String status
    ) {
        Long companyId = getCurrentEmployerCompanyId();

        String normalizedStatus = status.trim().toUpperCase();

        if (!EMPLOYER_APPLICATION_STATUSES.contains(normalizedStatus)) {
            throw new IllegalArgumentException(
                    "Application status must be REVIEWED, SHORTLISTED, or REJECTED"
            );
        }

        JobApplication application = jobApplicationRepository.findByIdAndJobCompanyId(
                        applicationId,
                        companyId
                )
                .orElseThrow(() -> new ResourceNotFoundException(
                        "JobApplication",
                        "id",
                        applicationId
                ));

        application.setStatus(normalizedStatus);

        return mapToJobApplicationResponse(application);
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
    private void validateCandidateProfileIsReady(String candidateEmail) {
        CandidateProfile profile = candidateProfileRepository.findByUserEmail(candidateEmail)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Please complete your candidate profile before applying to jobs."
                ));

        if (profile.getResume() == null || profile.getResume().length == 0) {
            throw new IllegalArgumentException(
                    "Please upload your resume before applying to jobs."
            );
        }
    }
    private Long getCurrentEmployerCompanyId() {
        String currentUserEmail = getCurrentUserEmail();

        User employer = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User",
                        "email",
                        currentUserEmail
                ));

        if (employer.getCompany() == null) {
            throw new IllegalArgumentException("Employer is not assigned to a company");
        }

        return employer.getCompany().getId();
    }
}
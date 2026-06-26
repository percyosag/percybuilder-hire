package com.percybuilder.jobportalapi.job;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.constants.CacheNames;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.job.dto.JobRequest;
import com.percybuilder.jobportalapi.job.dto.JobResponse;
import com.percybuilder.jobportalapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.percybuilder.jobportalapi.user.User;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import java.time.LocalDate;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    @LogExecution
    @Cacheable(value = CacheNames.JOBS, key = "'public'")
    public List<JobResponse> getAllJobs() {
        log.debug("Fetching all jobs");
        List<JobResponse> jobs = jobRepository.findAll()
                .stream()
                .map(this::mapToJobResponse)
                .toList();
        log.info("Fetched {} jobs", jobs.size());
        return jobs;
    }
    @LogExecution
    @Cacheable(value = CacheNames.JOBS, key = "'id-' + #id")
    public JobResponse getJobById(Long id) {
        log.debug("Fetching job by id: {}", id);

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Job not found with id: {}", id);
                    return new ResourceNotFoundException("Job", "id", id);
                });

        log.info("Fetched job with id: {} and title: {}", job.getId(), job.getTitle());

        return mapToJobResponse(job);
    }
    @LogExecution
    public List<JobResponse> getMyCompanyJobs() {
        User employer = getCurrentUser();

        if (employer.getCompany() == null) {
            throw new IllegalArgumentException("Employer is not assigned to a company");
        }

        return jobRepository.findByCompanyIdOrderByPostedDateDesc(employer.getCompany().getId())
                .stream()
                .map(this::mapToJobResponse)
                .toList();
    }

    @Transactional
    @LogExecution
    @CacheEvict(value = {CacheNames.JOBS, CacheNames.COMPANIES}, allEntries = true)
    public JobResponse createJobForMyCompany(JobRequest request) {
        User employer = getCurrentUser();

        if (employer.getCompany() == null) {
            throw new IllegalArgumentException("Employer is not assigned to a company");
        }

        Job job = new Job();
        applyJobRequest(job, request);

        job.setCompany(employer.getCompany());
        job.setPostedDate(LocalDate.now());
        job.setApplicationsCount(0);
        job.setStatus("OPEN");

        Job savedJob = jobRepository.save(job);

        return mapToJobResponse(savedJob);
    }

    @Transactional
    @LogExecution
    @CacheEvict(value = {CacheNames.JOBS, CacheNames.COMPANIES}, allEntries = true)
    public JobResponse updateMyCompanyJobStatus(Long jobId, String status) {
        User employer = getCurrentUser();

        if (employer.getCompany() == null) {
            throw new IllegalArgumentException("Employer is not assigned to a company");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        if (!job.getCompany().getId().equals(employer.getCompany().getId())) {
            throw new IllegalArgumentException("You can only update jobs that belong to your company");
        }

        job.setStatus(status.trim().toUpperCase());

        return mapToJobResponse(job);
    }

    private void applyJobRequest(Job job, JobRequest request) {
        job.setTitle(request.title());
        job.setLocation(request.location());
        job.setWorkType(request.workType());
        job.setJobType(request.jobType());
        job.setCategory(request.category());
        job.setExperienceLevel(request.experienceLevel());
        job.setSalaryMin(request.salaryMin());
        job.setSalaryMax(request.salaryMax());
        job.setSalaryCurrency(request.salaryCurrency());
        job.setSalaryPeriod(request.salaryPeriod());
        job.setDescription(request.description());
        job.setRequirements(request.requirements());
        job.setBenefits(request.benefits());
        job.setApplicationDeadline(request.applicationDeadline());
        job.setFeatured(request.featured());
        job.setUrgent(request.urgent());
        job.setRemote(request.remote());
    }

    private User getCurrentUser() {
        String currentUserEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));
    }
    private JobResponse mapToJobResponse(Job job) {
        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getCompany().getId(),
                job.getCompany().getName(),
                job.getLocation(),
                job.getWorkType(),
                job.getJobType(),
                job.getCategory(),
                job.getExperienceLevel(),
                job.getSalaryMin(),
                job.getSalaryMax(),
                job.getSalaryCurrency(),
                job.getSalaryPeriod(),
                job.getDescription(),
                job.getRequirements(),
                job.getBenefits(),
                job.getPostedDate(),
                job.getApplicationDeadline(),
                job.getApplicationsCount(),
                job.getFeatured(),
                job.getUrgent(),
                job.getRemote(),
                job.getStatus()
        );
    }
}
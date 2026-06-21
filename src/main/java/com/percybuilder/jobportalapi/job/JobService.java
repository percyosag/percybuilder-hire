package com.percybuilder.jobportalapi.job;

import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.job.dto.JobResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public List<JobResponse> getAllJobs() {
        log.debug("Fetching all jobs");
        List<JobResponse> jobs = jobRepository.findAll()
                .stream()
                .map(this::mapToJobResponse)
                .toList();
        log.info("Fetched {} jobs", jobs.size());
        return jobs;
    }
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
package com.percybuilder.jobportalapi.savedjob;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.job.Job;
import com.percybuilder.jobportalapi.job.JobRepository;
import com.percybuilder.jobportalapi.savedjob.dto.SavedJobResponse;
import com.percybuilder.jobportalapi.user.User;
import com.percybuilder.jobportalapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SavedJobService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    @Transactional
    @LogExecution
    public SavedJobResponse saveJob(Long jobId) {
        String currentUserEmail = getCurrentUserEmail();

        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        user.getSavedJobs().add(job);

        return mapToSavedJobResponse(job);
    }

    @Transactional
    @LogExecution
    public void removeSavedJob(Long jobId) {
        String currentUserEmail = getCurrentUserEmail();

        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        user.getSavedJobs().remove(job);
    }

    @LogExecution
    public List<SavedJobResponse> getMySavedJobs() {
        String currentUserEmail = getCurrentUserEmail();

        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        return user.getSavedJobs()
                .stream()
                .map(this::mapToSavedJobResponse)
                .toList();
    }

    private SavedJobResponse mapToSavedJobResponse(Job job) {
        return new SavedJobResponse(
                job.getId(),
                job.getTitle(),
                job.getCompany().getName(),
                job.getLocation(),
                job.getWorkType(),
                job.getJobType(),
                job.getCategory(),
                job.getExperienceLevel(),
                job.getSalaryMin(),
                job.getSalaryMax(),
                job.getSalaryCurrency(),
                job.getStatus(),
                job.getFeatured(),
                job.getUrgent(),
                job.getRemote()
        );
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
}
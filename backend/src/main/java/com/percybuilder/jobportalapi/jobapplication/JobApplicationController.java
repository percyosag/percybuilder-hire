package com.percybuilder.jobportalapi.jobapplication;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationRequest;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping(ApiPaths.APPLICATIONS)
@RestController
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> applyToJob(
            @Valid @RequestBody JobApplicationRequest request) {

        JobApplicationResponse response = jobApplicationService.applyToJob(request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<Void> withdrawApplication(@PathVariable Long jobId) {
        jobApplicationService.withdrawApplication(jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<List<JobApplicationResponse>> getMyApplications() {
        List<JobApplicationResponse> response = jobApplicationService.getMyApplications();
        return ResponseEntity.ok(response);
    }
    @GetMapping("/employer")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsForMyCompany() {
        List<JobApplicationResponse> applications =
                jobApplicationService.getApplicationsForMyCompany();

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/employer/jobs/{jobId}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsForMyCompanyJob(
            @PathVariable Long jobId
    ) {
        List<JobApplicationResponse> applications =
                jobApplicationService.getApplicationsForMyCompanyJob(jobId);

        return ResponseEntity.ok(applications);
    }

    @PatchMapping("/employer/{applicationId}/status")
    public ResponseEntity<JobApplicationResponse> updateApplicationStatusForMyCompany(
            @PathVariable Long applicationId,
            @RequestParam String status
    ) {
        JobApplicationResponse response =
                jobApplicationService.updateApplicationStatusForMyCompany(
                        applicationId,
                        status
                );

        return ResponseEntity.ok(response);
    }
}
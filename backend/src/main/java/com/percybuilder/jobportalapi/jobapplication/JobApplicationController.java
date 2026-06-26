package com.percybuilder.jobportalapi.jobapplication;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationRequest;
import com.percybuilder.jobportalapi.jobapplication.dto.JobApplicationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
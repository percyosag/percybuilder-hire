package com.percybuilder.jobportalapi.job;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.job.dto.JobRequest;
import com.percybuilder.jobportalapi.job.dto.JobResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPaths.JOBS)
public class JobController {


    private final JobService jobService;

    @GetMapping("/")
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        List<JobResponse> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {

        JobResponse job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }
    @GetMapping("/employer")
    public ResponseEntity<List<JobResponse>> getMyCompanyJobs() {

        List<JobResponse> jobs = jobService.getMyCompanyJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/employer")
    public ResponseEntity<JobResponse> createJobForMyCompany(
            @Valid @RequestBody JobRequest request) {

        JobResponse job = jobService.createJobForMyCompany(request);
        return ResponseEntity.ok(job);
    }

    @PatchMapping("/employer/{jobId}/status")
    public ResponseEntity<JobResponse> updateMyCompanyJobStatus(
            @PathVariable Long jobId,
            @RequestParam String status) {

        JobResponse job = jobService.updateMyCompanyJobStatus(jobId, status);
        return ResponseEntity.ok(job);
    }
}
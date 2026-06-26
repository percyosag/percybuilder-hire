package com.percybuilder.jobportalapi.savedjob;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.savedjob.dto.SavedJobResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping(ApiPaths.USERS + "/saved-jobs")
@RestController
public class SavedJobController {

    private final SavedJobService savedJobService;

    @PostMapping("/{jobId}")
    public ResponseEntity<SavedJobResponse> saveJob(@PathVariable Long jobId) {
        SavedJobResponse response = savedJobService.saveJob(jobId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> removeSavedJob(@PathVariable Long jobId) {
        savedJobService.removeSavedJob(jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SavedJobResponse>> getMySavedJobs() {
        List<SavedJobResponse> response = savedJobService.getMySavedJobs();
        return ResponseEntity.ok(response);
    }
}
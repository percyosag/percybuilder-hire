package com.percybuilder.jobportalapi.profile;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.profile.dto.CandidateProfileRequest;
import com.percybuilder.jobportalapi.profile.dto.CandidateProfileResponse;
import com.percybuilder.jobportalapi.profile.dto.ProfileFileResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

@RequiredArgsConstructor
@RequestMapping(ApiPaths.PROFILE + "/candidate")
@RestController
public class CandidateProfileController {

    private final CandidateProfileService candidateProfileService;

    @PutMapping
    public ResponseEntity<CandidateProfileResponse> saveCandidateProfile(
            @Valid @RequestBody CandidateProfileRequest request) {

        CandidateProfileResponse response = candidateProfileService.saveCandidateProfile(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CandidateProfileResponse> getMyCandidateProfile() {
        CandidateProfileResponse response = candidateProfileService.getMyCandidateProfile();
        return ResponseEntity.ok(response);
    }
    @PostMapping(value = "/picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateProfileResponse> uploadProfilePicture(
            @RequestParam("file") MultipartFile file) {

        CandidateProfileResponse response = candidateProfileService.uploadProfilePicture(file);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CandidateProfileResponse> uploadResume(
            @RequestParam("file") MultipartFile file) {

        CandidateProfileResponse response = candidateProfileService.uploadResume(file);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/picture")
    public ResponseEntity<byte[]> downloadProfilePicture() {
        ProfileFileResponse fileResponse = candidateProfileService.downloadProfilePicture();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileResponse.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResponse.filename() + "\"")
                .body(fileResponse.content());
    }

    @GetMapping("/resume")
    public ResponseEntity<byte[]> downloadResume() {
        ProfileFileResponse fileResponse = candidateProfileService.downloadResume();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fileResponse.contentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResponse.filename() + "\"")
                .body(fileResponse.content());
    }
}
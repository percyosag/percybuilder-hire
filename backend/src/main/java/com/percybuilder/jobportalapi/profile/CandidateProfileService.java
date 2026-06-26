package com.percybuilder.jobportalapi.profile;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.profile.dto.CandidateProfileRequest;
import com.percybuilder.jobportalapi.profile.dto.CandidateProfileResponse;
import com.percybuilder.jobportalapi.profile.dto.ProfileFileResponse;
import com.percybuilder.jobportalapi.user.User;
import com.percybuilder.jobportalapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;
    private final UserRepository userRepository;

    @Transactional
    @LogExecution
    public CandidateProfileResponse saveCandidateProfile(CandidateProfileRequest request) {

        String currentUserEmail = getCurrentUserEmail();

        User user = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", currentUserEmail));

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseGet(CandidateProfile::new);

        profile.setUser(user);
        profile.setJobTitle(request.jobTitle());
        profile.setLocation(request.location());
        profile.setExperienceLevel(request.experienceLevel());
        profile.setProfessionalBio(request.professionalBio());
        profile.setPortfolioWebsite(request.portfolioWebsite());

        CandidateProfile savedProfile = candidateProfileRepository.save(profile);

        return mapToCandidateProfileResponse(savedProfile);
    }

    @LogExecution
    public CandidateProfileResponse getMyCandidateProfile() {
        String currentUserEmail = getCurrentUserEmail();

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("CandidateProfile", "email", currentUserEmail));

        return mapToCandidateProfileResponse(profile);
    }


    @Transactional
    @LogExecution
    public CandidateProfileResponse uploadProfilePicture(MultipartFile file) {
        validateUploadedFile(file);

        String currentUserEmail = getCurrentUserEmail();

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("CandidateProfile", "email", currentUserEmail));

        try {
            profile.setProfilePicture(file.getBytes());
            profile.setProfilePictureName(file.getOriginalFilename());
            profile.setProfilePictureType(file.getContentType());

            CandidateProfile savedProfile = candidateProfileRepository.save(profile);
            return mapToCandidateProfileResponse(savedProfile);
        } catch (IOException exception) {
            throw new IllegalArgumentException("Could not upload profile picture");
        }
    }

    @Transactional
    @LogExecution
    public CandidateProfileResponse uploadResume(MultipartFile file) {
        validateUploadedFile(file);

        String currentUserEmail = getCurrentUserEmail();

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("CandidateProfile", "email", currentUserEmail));

        try {
            profile.setResume(file.getBytes());
            profile.setResumeName(file.getOriginalFilename());
            profile.setResumeType(file.getContentType());

            CandidateProfile savedProfile = candidateProfileRepository.save(profile);
            return mapToCandidateProfileResponse(savedProfile);
        } catch (IOException exception) {
            throw new IllegalArgumentException("Could not upload resume");
        }
    }
    @LogExecution
    public ProfileFileResponse downloadProfilePicture() {
        String currentUserEmail = getCurrentUserEmail();

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("CandidateProfile", "email", currentUserEmail));

        if (profile.getProfilePicture() == null) {
            throw new ResourceNotFoundException("ProfilePicture", "email", currentUserEmail);
        }

        return new ProfileFileResponse(
                profile.getProfilePicture(),
                profile.getProfilePictureName(),
                profile.getProfilePictureType()
        );
    }

    @LogExecution
    public ProfileFileResponse downloadResume() {
        String currentUserEmail = getCurrentUserEmail();

        CandidateProfile profile = candidateProfileRepository.findByUserEmail(currentUserEmail)
                .orElseThrow(() -> new ResourceNotFoundException("CandidateProfile", "email", currentUserEmail));

        if (profile.getResume() == null) {
            throw new ResourceNotFoundException("Resume", "email", currentUserEmail);
        }

        return new ProfileFileResponse(
                profile.getResume(),
                profile.getResumeName(),
                profile.getResumeType()
        );
    }
    private CandidateProfileResponse mapToCandidateProfileResponse(CandidateProfile profile) {
        User user = profile.getUser();

        return new CandidateProfileResponse(
                profile.getId(),
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                profile.getJobTitle(),
                profile.getLocation(),
                profile.getExperienceLevel(),
                profile.getProfessionalBio(),
                profile.getPortfolioWebsite(),
                profile.getProfilePictureName(),
                profile.getResumeName(),
                profile.getProfilePicture() != null,
                profile.getResume() != null
        );
    }

    private String getCurrentUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
    private void validateUploadedFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file cannot be empty");
        }
    }
}
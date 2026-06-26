package com.percybuilder.jobportalapi.profile.dto;

public record CandidateProfileResponse(
        Long id,
        Long userId,
        String fullName,
        String email,
        String jobTitle,
        String location,
        String experienceLevel,
        String professionalBio,
        String portfolioWebsite,
        String profilePictureName,
        String resumeName,
        boolean hasProfilePicture,
        boolean hasResume
) {}
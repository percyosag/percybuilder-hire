package com.percybuilder.jobportalapi.profile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CandidateProfileRequest(
        @NotBlank(message = "Job title is required")
        String jobTitle,

        @NotBlank(message = "Location is required")
        String location,

        @NotBlank(message = "Experience level is required")
        @Size(max = 50, message = "Experience level cannot exceed 50 characters")
        String experienceLevel,

        @NotBlank(message = "Professional bio is required")
        @Size(max = 5000, message = "Professional bio cannot exceed 5000 characters")
        String professionalBio,

        String portfolioWebsite
) {}
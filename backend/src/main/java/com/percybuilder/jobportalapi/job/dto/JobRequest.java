package com.percybuilder.jobportalapi.job.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record JobRequest(
        @NotBlank(message = "Job title is required")
        String title,

        @NotBlank(message = "Location is required")
        String location,

        @NotBlank(message = "Work type is required")
        String workType,

        @NotBlank(message = "Job type is required")
        String jobType,

        String category,

        String experienceLevel,

        Integer salaryMin,

        Integer salaryMax,

        String salaryCurrency,

        String salaryPeriod,

        @Size(max = 3000, message = "Description cannot exceed 3000 characters")
        String description,

        @Size(max = 3000, message = "Requirements cannot exceed 3000 characters")
        String requirements,

        @Size(max = 2000, message = "Benefits cannot exceed 2000 characters")
        String benefits,

        LocalDate applicationDeadline,

        Boolean featured,

        Boolean urgent,

        Boolean remote
) {}
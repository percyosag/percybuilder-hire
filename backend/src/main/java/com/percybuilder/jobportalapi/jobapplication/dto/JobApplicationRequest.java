package com.percybuilder.jobportalapi.jobapplication.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record JobApplicationRequest(
        @NotNull(message = "Job id is required")
        Long jobId,

        @Size(max = 2000, message = "Cover letter cannot exceed 2000 characters")
        String coverLetter
) {}
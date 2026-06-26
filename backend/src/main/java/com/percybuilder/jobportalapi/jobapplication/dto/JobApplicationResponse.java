package com.percybuilder.jobportalapi.jobapplication.dto;

import java.time.LocalDate;

public record JobApplicationResponse(
        Long id,
        Long candidateId,
        String candidateName,
        String candidateEmail,
        Long jobId,
        String jobTitle,
        String companyName,
        String jobLocation,
        String status,
        LocalDate appliedDate,
        String coverLetter
) {}
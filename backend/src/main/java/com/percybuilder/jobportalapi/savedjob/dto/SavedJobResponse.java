package com.percybuilder.jobportalapi.savedjob.dto;

public record SavedJobResponse(
        Long jobId,
        String title,
        String companyName,
        String location,
        String workType,
        String jobType,
        String category,
        String experienceLevel,
        Integer salaryMin,
        Integer salaryMax,
        String salaryCurrency,
        String status,
        Boolean featured,
        Boolean urgent,
        Boolean remote
) {}
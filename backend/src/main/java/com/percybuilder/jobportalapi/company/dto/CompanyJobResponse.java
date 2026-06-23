package com.percybuilder.jobportalapi.company.dto;

public record CompanyJobResponse(
        Long id,
        String title,
        String location,
        String workType,
        String jobType,
        String experienceLevel,
        Integer salaryMin,
        Integer salaryMax,
        String salaryCurrency,
        String salaryPeriod,
        Boolean featured,
        Boolean urgent,
        Boolean remote,
        String status
) {
}
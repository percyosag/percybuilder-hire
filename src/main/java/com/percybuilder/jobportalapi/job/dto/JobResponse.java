package com.percybuilder.jobportalapi.job.dto;

import java.time.LocalDate;

public record JobResponse(
        Long id,
        String title,
        Long companyId,
        String companyName,
        String location,
        String workType,
        String jobType,
        String category,
        String experienceLevel,
        Integer salaryMin,
        Integer salaryMax,
        String salaryCurrency,
        String salaryPeriod,
        String description,
        String requirements,
        String benefits,
        LocalDate postedDate,
        LocalDate applicationDeadline,
        Integer applicationsCount,
        Boolean featured,
        Boolean urgent,
        Boolean remote,
        String status
) {
}
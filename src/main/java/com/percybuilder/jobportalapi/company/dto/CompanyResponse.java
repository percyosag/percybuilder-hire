package com.percybuilder.jobportalapi.company.dto;

import java.util.List;

public record CompanyResponse(
        Long id,
        String name,
        String logo,
        String industry,
        String companySize,
        Double rating,
        String location,
        Integer foundedYear,
        String website,
        String description,
        List<CompanyJobResponse> jobs
) {
}
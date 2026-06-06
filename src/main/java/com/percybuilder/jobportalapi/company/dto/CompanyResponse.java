package com.percybuilder.jobportalapi.company.dto;

public record CompanyResponse(
        Long id,
        String name,
        String industry,
        String location,
        String website,
        String description
) {
}
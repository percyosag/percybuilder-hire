package com.percybuilder.jobportalapi.company.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CompanyRequest(

        @NotBlank(message = "Company name is required")
        String name,

        String logo,

        @NotBlank(message = "Industry is required")
        String industry,

        String companySize,

        @Min(value = 0, message = "Rating cannot be less than 0")
        @Max(value = 5, message = "Rating cannot be more than 5")
        Double rating,

        String location,

        @Min(value = 1800, message = "Founded year must be realistic")
        Integer foundedYear,

        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,

        String website
) {
}
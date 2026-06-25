package com.percybuilder.jobportalapi.user.dto;

public record UserAdminResponse(
        Long id,
        String fullName,
        String email,
        String mobileNumber,
        String role,
        Long companyId,
        String companyName,
        Boolean enabled
) {
}
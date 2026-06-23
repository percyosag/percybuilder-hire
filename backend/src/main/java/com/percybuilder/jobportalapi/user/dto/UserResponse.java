package com.percybuilder.jobportalapi.user.dto;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String mobileNumber,
        String role,
        Boolean enabled
) {
}
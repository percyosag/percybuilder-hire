package com.percybuilder.jobportalapi.contact.dto;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        String userType,
        String status,
        LocalDateTime createdAt
) {
}
package com.percybuilder.jobportalapi.auth.dto;

public record LoginResponse(
        String message,
        AuthUserResponse user,
        String token
) {
}
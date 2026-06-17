package com.percybuilder.jobportalapi.security;

public final class SecurityPaths {

    private SecurityPaths() {
    }

    public static final String[] PUBLIC_ENDPOINTS = {
            "/api/v1/auth/**",
            "/api/v1/companies/**",
            "/api/v1/jobs/**",
            "/api/v1/contacts",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/h2-console/**"
    };
}
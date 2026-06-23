
package com.percybuilder.jobportalapi.security;

public final class SecurityPaths {

    private SecurityPaths() {
    }

    public static final String API_V1 = "/api/v1";

    public static final String[] PUBLIC_ENDPOINTS = {
            API_V1 + "/info",
            API_V1 + "/auth/**",
            API_V1 + "/companies/**",
            API_V1 + "/jobs/**",
            API_V1 + "/contacts",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/h2-console/**",
            "/webjars/**",
            "/swagger-resources/**",
            "/error"
    };

    public static final String[] PROTECTED_ENDPOINTS = {
            API_V1 + "/profile/**"
    };
}
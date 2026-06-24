package com.percybuilder.jobportalapi.security;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;

public final class SecurityPaths {

    private SecurityPaths() {
    }

    public static final String[] PUBLIC_ENDPOINTS = {
            ApiPaths.INFO,
            ApiPaths.AUTH + "/**",
            ApiPaths.COMPANIES + "/**",
            ApiPaths.JOBS + "/**",
            ApiPaths.CONTACTS,
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/h2-console/**",
            "/error",
            "/webjars/**",
            "/swagger-resources/**",

    };

    public static final String[] PROTECTED_ENDPOINTS = {
            ApiPaths.PROFILE + "/**"
    };
}
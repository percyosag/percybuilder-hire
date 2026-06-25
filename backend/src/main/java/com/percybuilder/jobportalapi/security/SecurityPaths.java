package com.percybuilder.jobportalapi.security;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;

public final class SecurityPaths {

    private SecurityPaths() {
    }

    public static final String[] PUBLIC_ENDPOINTS = {
            ApiPaths.INFO,
            ApiPaths.AUTH + "/**",

            ApiPaths.COMPANIES,
            ApiPaths.COMPANIES + "/*",
            ApiPaths.COMPANIES + "/by-job-status",

            ApiPaths.JOBS + "/**",
            ApiPaths.CONTACTS,

            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/h2-console/**",
            "/webjars/**",
            "/swagger-resources/**",
            "/error"
    };
    public static final String[] ADMIN_ENDPOINTS = {
            ApiPaths.CONTACTS + "/admin",
            ApiPaths.CONTACTS + "/admin/**",
            ApiPaths.COMPANIES + "/admin",
            ApiPaths.COMPANIES + "/admin/**"
    };

    public static final String[] PROTECTED_ENDPOINTS = {
            ApiPaths.PROFILE + "/**"
    };
}
package com.percybuilder.jobportalapi.common.constants;

public final class ApiPaths {

    private ApiPaths() {
    }

    public static final String API = "/api";
    public static final String V1 = "/v1";
    public static final String API_V1 = API + V1;

    public static final String AUTH = API_V1 + "/auth";
    public static final String USERS = API_V1 + "/users";
    public static final String COMPANIES = API_V1 + "/companies";
    public static final String JOBS = API_V1 + "/jobs";
    public static final String CONTACTS = API_V1 + "/contacts";
    public static final String PROFILE = API_V1 + "/profile";
    public static final String APPLICATIONS = API_V1 + "/applications";
    public static final String INFO = API_V1 + "/info";
}
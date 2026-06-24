package com.percybuilder.jobportalapi.common.constants;

public final class AppConstants {

    private AppConstants() {
    }
    public static final String NEW_CONTACT_STATUS = "NEW";
    public static final String CLOSED_CONTACT_STATUS = "CLOSED";
    public static final String JWT_SECRET_KEY = "JWT_SECRET";
    public static final String JWT_SECRET_DEFAULT_VALUE =
            "PercyBuilderHireJwtSecretKeyForDevelopmentOnlyMustBeLongEnoughForHS256";

    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_TOKEN_PREFIX = "Bearer ";
    public static final long JWT_EXPIRATION_TIME_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
}
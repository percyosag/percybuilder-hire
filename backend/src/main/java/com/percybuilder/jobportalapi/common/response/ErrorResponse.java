package com.percybuilder.jobportalapi.common.response;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        String apiPath,
        int statusCode,
        String error,
        String message,
        Map<String, String> validationErrors,
        LocalDateTime timestamp
) {
}
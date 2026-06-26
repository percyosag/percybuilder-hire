package com.percybuilder.jobportalapi.profile.dto;

public record ProfileFileResponse(
        byte[] content,
        String filename,
        String contentType
) {}
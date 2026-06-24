package com.percybuilder.jobportalapi.contact.dto;

import java.util.List;

public record ContactPageResponse(
        List<ContactResponse> contacts,
        int pageNumber,
        int pageSize,
        long totalElements,
        int totalPages,
        boolean last
) {
}
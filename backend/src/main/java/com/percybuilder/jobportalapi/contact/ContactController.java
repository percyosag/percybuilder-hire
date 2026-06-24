package com.percybuilder.jobportalapi.contact;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.contact.dto.ContactPageResponse;
import com.percybuilder.jobportalapi.contact.dto.ContactRequest;
import com.percybuilder.jobportalapi.contact.dto.ContactResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping(ApiPaths.CONTACTS)
@RestController
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> saveContact(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.saveContact(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ContactResponse>> getContactsByStatus(
            @RequestParam(defaultValue = "NEW") String status
    ) {
        List<ContactResponse> contacts = contactService.getContactsByStatus(status);
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/admin/sort")
    public ResponseEntity<List<ContactResponse>> getContactsByStatusSorted(
            @RequestParam(defaultValue = "NEW") String status,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        List<ContactResponse> contacts = contactService.getContactsByStatusSorted(
                status,
                sortBy,
                sortDirection
        );

        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/admin/page")
    public ResponseEntity<ContactPageResponse> getContactsByStatusPaged(
            @RequestParam(defaultValue = "NEW") String status,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        ContactPageResponse response = contactService.getContactsByStatusPaged(
                status,
                pageNumber,
                pageSize,
                sortBy,
                sortDirection
        );

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<ContactResponse> updateContactStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        ContactResponse response = contactService.updateContactStatus(id, status);
        return ResponseEntity.ok(response);
    }
}
package com.percybuilder.jobportalapi.contact;

import com.percybuilder.jobportalapi.contact.dto.ContactRequest;
import com.percybuilder.jobportalapi.contact.dto.ContactResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/api/v1/contacts")
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.saveContact(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
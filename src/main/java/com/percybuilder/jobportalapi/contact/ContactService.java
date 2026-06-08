package com.percybuilder.jobportalapi.contact;

import com.percybuilder.jobportalapi.contact.dto.ContactRequest;
import com.percybuilder.jobportalapi.contact.dto.ContactResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactService {

    private static final String NEW_STATUS = "NEW";

    private final ContactRepository contactRepository;

    public ContactResponse saveContact(ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.name());
        contact.setEmail(request.email());
        contact.setSubject(request.subject());
        contact.setMessage(request.message());
        contact.setUserType(request.userType());
        contact.setStatus(NEW_STATUS);
        contact.setCreatedAt(LocalDateTime.now());

        Contact savedContact = contactRepository.save(contact);

        return mapToContactResponse(savedContact);
    }

    private ContactResponse mapToContactResponse(Contact contact) {
        return new ContactResponse(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage(),
                contact.getUserType(),
                contact.getStatus(),
                contact.getCreatedAt()
        );
    }
}
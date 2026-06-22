package com.percybuilder.jobportalapi.contact;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.contact.dto.ContactRequest;
import com.percybuilder.jobportalapi.contact.dto.ContactResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

    private static final String NEW_STATUS = "NEW";

    private final ContactRepository contactRepository;
    @LogExecution
    public ContactResponse saveContact(ContactRequest request) {
        log.info("Contact message submission started for email: {}", request.email());
        log.debug("Contact message subject: {}", request.subject());
        Contact contact = new Contact();
        contact.setName(request.name());
        contact.setEmail(request.email());
        contact.setSubject(request.subject());
        contact.setMessage(request.message());
        contact.setUserType(request.userType());
        contact.setStatus(NEW_STATUS);


        Contact savedContact = contactRepository.save(contact);
        log.info("Contact message saved with id: {} and status: {}",
                savedContact.getId(),
                savedContact.getStatus()
        );
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
package com.percybuilder.jobportalapi.contact;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.constants.AppConstants;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.contact.dto.ContactPageResponse;
import com.percybuilder.jobportalapi.contact.dto.ContactRequest;
import com.percybuilder.jobportalapi.contact.dto.ContactResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

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
        contact.setStatus(AppConstants.NEW_CONTACT_STATUS);

        Contact savedContact = contactRepository.save(contact);

        log.info("Contact message saved with id: {} and status: {}",
                savedContact.getId(),
                savedContact.getStatus()
        );

        return mapToContactResponse(savedContact);
    }

    @LogExecution
    public List<ContactResponse> getContactsByStatus(String status) {
        return contactRepository.findByStatus(normalizeStatus(status))
                .stream()
                .map(this::mapToContactResponse)
                .toList();
    }

    @LogExecution
    public List<ContactResponse> getContactsByStatusSorted(
            String status,
            String sortBy,
            String sortDirection
    ) {
        Sort sort = buildSort(sortBy, sortDirection);

        return contactRepository.findByStatus(normalizeStatus(status), sort)
                .stream()
                .map(this::mapToContactResponse)
                .toList();
    }

    @LogExecution
    public ContactPageResponse getContactsByStatusPaged(
            String status,
            int pageNumber,
            int pageSize,
            String sortBy,
            String sortDirection
    ) {
        Sort sort = buildSort(sortBy, sortDirection);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Contact> contactPage = contactRepository.findByStatus(
                normalizeStatus(status),
                pageable
        );

        List<ContactResponse> contacts = contactPage.getContent()
                .stream()
                .map(this::mapToContactResponse)
                .toList();

        return new ContactPageResponse(
                contacts,
                contactPage.getNumber(),
                contactPage.getSize(),
                contactPage.getTotalElements(),
                contactPage.getTotalPages(),
                contactPage.isLast()
        );
    }

    @LogExecution
    public ContactResponse updateContactStatus(Long id, String status) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "id", id));

        contact.setStatus(normalizeStatus(status));

        Contact updatedContact = contactRepository.save(contact);

        log.info("Contact message status updated. id: {}, status: {}",
                updatedContact.getId(),
                updatedContact.getStatus()
        );

        return mapToContactResponse(updatedContact);
    }

    private String normalizeStatus(String status) {
        return status.trim().toUpperCase();
    }

    private Sort buildSort(String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        return Sort.by(direction, sortBy);
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
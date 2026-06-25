package com.percybuilder.jobportalapi.user;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.company.Company;
import com.percybuilder.jobportalapi.company.CompanyRepository;
import com.percybuilder.jobportalapi.user.dto.UserAdminResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserAdminService {

    private static final String EMPLOYER_ROLE = "ROLE_EMPLOYER";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;

    @LogExecution
    public UserAdminResponse findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        return mapToUserAdminResponse(user);
    }

    @Transactional
    @LogExecution
    public UserAdminResponse promoteUserToEmployer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Role employerRole = roleRepository.findByName(EMPLOYER_ROLE)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", EMPLOYER_ROLE));

        user.setRole(employerRole);

        return mapToUserAdminResponse(user);
    }

    @Transactional
    @LogExecution
    public UserAdminResponse assignCompanyToUser(Long userId, Long companyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", companyId));

        user.setCompany(company);

        return mapToUserAdminResponse(user);
    }

    private UserAdminResponse mapToUserAdminResponse(User user) {
        Company company = user.getCompany();

        return new UserAdminResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getRole().getName(),
                company != null ? company.getId() : null,
                company != null ? company.getName() : null,
                user.getEnabled()
        );
    }
}
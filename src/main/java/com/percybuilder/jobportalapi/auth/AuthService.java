package com.percybuilder.jobportalapi.auth;

import com.percybuilder.jobportalapi.auth.dto.RegisterRequest;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.user.Role;
import com.percybuilder.jobportalapi.user.RoleRepository;
import com.percybuilder.jobportalapi.user.User;
import com.percybuilder.jobportalapi.user.UserRepository;
import com.percybuilder.jobportalapi.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Set<String> ALLOWED_PUBLIC_ROLES = Set.of(
            "ROLE_CANDIDATE",
            "ROLE_EMPLOYER"
    );

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        String requestedRole = request.role().trim().toUpperCase();

        if (!ALLOWED_PUBLIC_ROLES.contains(requestedRole)) {
            throw new IllegalArgumentException("Public registration only supports candidate and employer roles");
        }

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        if (request.mobileNumber() != null
                && !request.mobileNumber().isBlank()
                && userRepository.existsByMobileNumber(request.mobileNumber())) {
            throw new IllegalArgumentException("Mobile number is already registered");
        }

        Role role = roleRepository.findByName(requestedRole)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", requestedRole));

        User user = new User();
        user.setFullName(request.fullName().trim());
        user.setEmail(normalizedEmail);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setMobileNumber(request.mobileNumber());
        user.setRole(role);
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getRole().getName(),
                user.getEnabled()
        );
    }
}
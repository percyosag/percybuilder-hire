package com.percybuilder.jobportalapi.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ProfileController {

    @GetMapping("/api/v1/profile/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Map<String, Object> response = Map.of(
                "username", authentication.getName(),
                "roles", roles
        );

        return ResponseEntity.ok(response);
    }
}
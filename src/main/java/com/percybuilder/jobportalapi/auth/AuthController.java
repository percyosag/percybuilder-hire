package com.percybuilder.jobportalapi.auth;

import com.percybuilder.jobportalapi.auth.dto.AuthUserResponse;
import com.percybuilder.jobportalapi.auth.dto.LoginRequest;
import com.percybuilder.jobportalapi.auth.dto.LoginResponse;
import com.percybuilder.jobportalapi.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        String token = jwtService.generateToken(authentication);

        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        AuthUserResponse user = new AuthUserResponse(
                authentication.getName(),
                roles
        );

        LoginResponse response = new LoginResponse(
                "Login successful",
                user,
                token
        );

        return ResponseEntity.ok(response);
    }
}
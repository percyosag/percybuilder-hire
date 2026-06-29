package com.percybuilder.jobportalapi.security;

import com.percybuilder.jobportalapi.config.jwt.AppJwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final AppJwtProperties appJwtProperties;

    public JwtService(AppJwtProperties appJwtProperties) {
        this.appJwtProperties = appJwtProperties;
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();

        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + appJwtProperties.getExpirationMs());

        return Jwts.builder()
                .subject(username)
                .issuer(appJwtProperties.getIssuer())
                .issuedAt(now)
                .expiration(expirationDate)
                .signWith(getSecretKey())
                .compact();
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSecretKey())
                .requireIssuer(appJwtProperties.getIssuer())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSecretKey())
                    .requireIssuer(appJwtProperties.getIssuer())
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (Exception exception) {
            return false;
        }
    }

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(
                appJwtProperties.getSecret().getBytes(StandardCharsets.UTF_8)
        );
    }
}
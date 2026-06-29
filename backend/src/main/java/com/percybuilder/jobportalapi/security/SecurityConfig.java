package com.percybuilder.jobportalapi.security;
import com.percybuilder.jobportalapi.config.cors.AppCorsProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final AppCorsProperties appCorsProperties;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                            .requestMatchers(SecurityPaths.ADMIN_ENDPOINTS).hasRole("ADMIN")
                            .requestMatchers(SecurityPaths.EMPLOYER_ENDPOINTS).hasRole("EMPLOYER")
                            .requestMatchers(SecurityPaths.PUBLIC_ENDPOINTS).permitAll()
                            .requestMatchers(SecurityPaths.PROTECTED_ENDPOINTS).authenticated()
                            .anyRequest().denyAll()
                    )
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(appCorsProperties.getAllowedOrigins());
        configuration.setAllowedMethods(appCorsProperties.getAllowedMethods());
        configuration.setAllowedHeaders(appCorsProperties.getAllowedHeaders());
        configuration.setExposedHeaders(appCorsProperties.getExposedHeaders());
        configuration.setAllowCredentials(appCorsProperties.getAllowCredentials());
        configuration.setMaxAge(appCorsProperties.getMaxAge());

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
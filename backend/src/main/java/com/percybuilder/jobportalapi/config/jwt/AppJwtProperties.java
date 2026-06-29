package com.percybuilder.jobportalapi.config.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.jwt")
public class AppJwtProperties {

    private String secret;

    private Long expirationMs;

    private String issuer;
}

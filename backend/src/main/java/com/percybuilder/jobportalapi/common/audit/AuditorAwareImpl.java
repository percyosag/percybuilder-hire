package com.percybuilder.jobportalapi.common.audit;

import org.jspecify.annotations.NonNull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditorAwareImpl")
public class AuditorAwareImpl implements AuditorAware<String> {

    private static final String SYSTEM_USER = "system";

    @Override
    public @NonNull Optional<String> getCurrentAuditor() {
        return Optional.of(SYSTEM_USER);
    }
}
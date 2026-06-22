package com.percybuilder.jobportalapi.aspects;

import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class ExceptionAuditAspect {

    @AfterThrowing(
            pointcut = "execution(* com.percybuilder.jobportalapi..*Controller.*(..)) || " +
                    "execution(* com.percybuilder.jobportalapi..*Service.*(..))",
            throwing = "exception"
    )
    public void auditException(JoinPoint joinPoint, Throwable exception) {
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        if (exception instanceof ResourceNotFoundException
                || exception instanceof IllegalArgumentException
                || exception instanceof BadCredentialsException) {
            log.warn(
                    "Handled exception in {}.{}: {} - {}",
                    className,
                    methodName,
                    exception.getClass().getSimpleName(),
                    exception.getMessage()
            );

            return;
        }

        log.error(
                "Unexpected exception in {}.{}: {} - {}",
                className,
                methodName,
                exception.getClass().getSimpleName(),
                exception.getMessage(),
                exception
        );
    }
}
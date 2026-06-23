package com.percybuilder.jobportalapi.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAndPerformanceAspect {

    @Around("@annotation(com.percybuilder.jobportalapi.common.annotation.LogExecution)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        long startTime = System.currentTimeMillis();

        log.debug("Started method: {}.{}", className, methodName);

        try {
            Object result = joinPoint.proceed();

            long duration = System.currentTimeMillis() - startTime;

            log.info("Finished method: {}.{} in {} ms", className, methodName, duration);

            return result;
        } catch (Throwable exception) {
            long duration = System.currentTimeMillis() - startTime;

            log.warn(
                    "Method failed: {}.{} after {} ms with error: {}",
                    className,
                    methodName,
                    duration,
                    exception.getMessage()
            );

            throw exception;
        }
    }
}

package com.percybuilder.jobportalapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class JobPortalApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobPortalApiApplication.class, args);
        System.out.println("JobPortalApiApplication started");
    }

}

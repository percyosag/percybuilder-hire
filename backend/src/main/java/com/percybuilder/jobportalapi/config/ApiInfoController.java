package com.percybuilder.jobportalapi.config;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.security.SecurityPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ApiInfoController {

    @GetMapping(ApiPaths.INFO)
    public ResponseEntity<Map<String, String>> getApiInfo() {
        Map<String, String> response = Map.of(
                "name", "PercyBuilder Hire API",
                "version", "v1",
                "status", "running"
        );

        return ResponseEntity.ok(response);
    }
}

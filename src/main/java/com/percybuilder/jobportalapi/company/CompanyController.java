package com.percybuilder.jobportalapi.company;

import com.percybuilder.jobportalapi.company.dto.CompanyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RequiredArgsConstructor

@RestController
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/api/v1/companies")
    public ResponseEntity<List<CompanyResponse>> getAllCompanies() {
        List<CompanyResponse> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
}
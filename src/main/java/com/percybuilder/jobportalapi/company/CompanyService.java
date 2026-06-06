package com.percybuilder.jobportalapi.company;

import com.percybuilder.jobportalapi.company.dto.CompanyResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(this::mapToCompanyResponse)
                .toList();
    }

    private CompanyResponse mapToCompanyResponse(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getIndustry(),
                company.getLocation(),
                company.getWebsite(),
                company.getDescription()
        );
    }
}
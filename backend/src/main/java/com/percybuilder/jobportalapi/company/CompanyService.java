package com.percybuilder.jobportalapi.company;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.company.dto.CompanyJobResponse;
import com.percybuilder.jobportalapi.company.dto.CompanyResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
    @LogExecution
    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(this::mapToCompanyResponse)
                .toList();
    }
    @LogExecution
    public CompanyResponse getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", id));

        return mapToCompanyResponse(company);
    }

    private CompanyResponse mapToCompanyResponse(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getLogo(),
                company.getIndustry(),
                company.getCompanySize(),
                company.getRating(),
                company.getLocation(),
                company.getFoundedYear(),
                company.getWebsite(),
                company.getDescription(),
                company.getJobs()
                        .stream()
                        .map(job -> new CompanyJobResponse(
                                job.getId(),
                                job.getTitle(),
                                job.getLocation(),
                                job.getWorkType(),
                                job.getJobType(),
                                job.getExperienceLevel(),
                                job.getSalaryMin(),
                                job.getSalaryMax(),
                                job.getSalaryCurrency(),
                                job.getSalaryPeriod(),
                                job.getFeatured(),
                                job.getUrgent(),
                                job.getRemote(),
                                job.getStatus()
                        ))
                        .toList()
        );
    }
}
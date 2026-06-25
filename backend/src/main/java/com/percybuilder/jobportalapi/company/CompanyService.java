package com.percybuilder.jobportalapi.company;

import com.percybuilder.jobportalapi.common.annotation.LogExecution;
import com.percybuilder.jobportalapi.common.exception.ResourceNotFoundException;
import com.percybuilder.jobportalapi.company.dto.CompanyJobResponse;
import com.percybuilder.jobportalapi.company.dto.CompanyRequest;
import com.percybuilder.jobportalapi.company.dto.CompanyResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
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
    @LogExecution
    public List<CompanyResponse> getCompaniesByJobStatus(String status) {
        return companyRepository.findCompaniesWithJobsByStatus(status)
                .stream()
                .map(this::mapToCompanyResponse)
                .toList();
    }
    @LogExecution
    public List<CompanyResponse> getAllCompaniesForAdmin() {
        return companyRepository.findAll()
                .stream()
                .map(this::mapToCompanyResponse)
                .toList();
    }

    @Transactional
    @LogExecution
    public CompanyResponse createCompany(CompanyRequest request) {
        Company company = new Company();

        applyCompanyRequest(company, request);

        Company savedCompany = companyRepository.save(company);

        return mapToCompanyResponse(savedCompany);
    }

    @Transactional
    @LogExecution
    public CompanyResponse updateCompany(Long id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", id));

        applyCompanyRequest(company, request);

        return mapToCompanyResponse(company);
    }

    @Transactional
    @LogExecution
    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", id));

        companyRepository.delete(company);
    }

    private void applyCompanyRequest(Company company, CompanyRequest request) {
        company.setName(request.name());
        company.setLogo(request.logo());
        company.setIndustry(request.industry());
        company.setCompanySize(request.companySize());
        company.setRating(request.rating());
        company.setLocation(request.location());
        company.setFoundedYear(request.foundedYear());
        company.setDescription(request.description());
        company.setWebsite(request.website());
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
package com.percybuilder.jobportalapi.jobapplication;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    boolean existsByCandidateEmailAndJobId(String candidateEmail, Long jobId);

    Optional<JobApplication> findByCandidateEmailAndJobId(String candidateEmail, Long jobId);

    List<JobApplication> findByCandidateEmailOrderByAppliedDateDesc(String candidateEmail);

    List<JobApplication> findByJobCompanyIdOrderByAppliedDateDesc(Long companyId);

    List<JobApplication> findByJobIdAndJobCompanyIdOrderByAppliedDateDesc(
            Long jobId,
            Long companyId
    );

    Optional<JobApplication> findByIdAndJobCompanyId(
            Long applicationId,
            Long companyId
    );
}
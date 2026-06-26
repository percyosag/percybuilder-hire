package com.percybuilder.jobportalapi.profile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {

    Optional<CandidateProfile> findByUserEmail(String email);

    boolean existsByUserEmail(String email);
}
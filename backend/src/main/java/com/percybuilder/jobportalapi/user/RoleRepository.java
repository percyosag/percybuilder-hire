package com.percybuilder.jobportalapi.user;

import com.percybuilder.jobportalapi.common.constants.CacheNames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.cache.annotation.Cacheable;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Cacheable(value = CacheNames.ROLES, key = "#name")
    Optional<Role> findByName(String name);
    
}
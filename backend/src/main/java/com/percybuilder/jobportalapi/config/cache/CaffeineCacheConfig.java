package com.percybuilder.jobportalapi.config.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.percybuilder.jobportalapi.common.constants.CacheNames;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.List;

@Configuration
public class CaffeineCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCache jobsCache = new CaffeineCache(
                CacheNames.JOBS,
                Caffeine.newBuilder()
                        .maximumSize(5000)
                        .expireAfterWrite(Duration.ofMinutes(10))
                        .recordStats()
                        .build()
        );

        CaffeineCache companiesCache = new CaffeineCache(
                CacheNames.COMPANIES,
                Caffeine.newBuilder()
                        .maximumSize(500)
                        .expireAfterWrite(Duration.ofMinutes(10))
                        .recordStats()
                        .build()
        );

        CaffeineCache rolesCache = new CaffeineCache(
                CacheNames.ROLES,
                Caffeine.newBuilder()
                        .maximumSize(100)
                        .expireAfterWrite(Duration.ofDays(1))
                        .recordStats()
                        .build()
        );

        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(List.of(jobsCache, companiesCache, rolesCache));

        return cacheManager;
    }
}
package com.percybuilder.jobportalapi.config.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.percybuilder.jobportalapi.common.constants.CacheNames;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.List;

@Configuration
public class CaffeineCacheConfig {

    @Value("${cache.jobs.ttl-minutes:10}")
    private long jobsCacheTtlMinutes;

    @Value("${cache.jobs.max-size:5000}")
    private long jobsCacheMaxSize;

    @Value("${cache.companies.ttl-minutes:10}")
    private long companiesCacheTtlMinutes;

    @Value("${cache.companies.max-size:500}")
    private long companiesCacheMaxSize;

    @Value("${cache.roles.ttl-days:1}")
    private long rolesCacheTtlDays;

    @Value("${cache.roles.max-size:100}")
    private long rolesCacheMaxSize;

    @Bean
    public CacheManager cacheManager() {
        CaffeineCache jobsCache = new CaffeineCache(
                CacheNames.JOBS,
                Caffeine.newBuilder()
                        .maximumSize(jobsCacheMaxSize)
                        .expireAfterWrite(Duration.ofMinutes(jobsCacheTtlMinutes))
                        .recordStats()
                        .build()
        );

        CaffeineCache companiesCache = new CaffeineCache(
                CacheNames.COMPANIES,
                Caffeine.newBuilder()
                        .maximumSize(companiesCacheMaxSize)
                        .expireAfterWrite(Duration.ofMinutes(companiesCacheTtlMinutes))
                        .recordStats()
                        .build()
        );

        CaffeineCache rolesCache = new CaffeineCache(
                CacheNames.ROLES,
                Caffeine.newBuilder()
                        .maximumSize(rolesCacheMaxSize)
                        .expireAfterWrite(Duration.ofDays(rolesCacheTtlDays))
                        .recordStats()
                        .build()
        );

        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(List.of(jobsCache, companiesCache, rolesCache));

        return cacheManager;
    }
}
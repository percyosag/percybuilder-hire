package com.percybuilder.jobportalapi.job;

import com.percybuilder.jobportalapi.common.entity.BaseEntity;
import com.percybuilder.jobportalapi.company.Company;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "jobs")
public class Job extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String workType;

    @Column(nullable = false)
    private String jobType;

    private String category;

    private String experienceLevel;

    private Integer salaryMin;

    private Integer salaryMax;

    private String salaryCurrency;

    private String salaryPeriod;

    @Column(length = 3000)
    private String description;

    @Column(length = 3000)
    private String requirements;

    @Column(length = 2000)
    private String benefits;

    private LocalDate postedDate;

    private LocalDate applicationDeadline;

    private Integer applicationsCount;

    private Boolean featured;

    private Boolean urgent;

    private Boolean remote;

    @Column(nullable = false)
    private String status;
}
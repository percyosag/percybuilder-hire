package com.percybuilder.jobportalapi.company;

import com.percybuilder.jobportalapi.common.entity.BaseEntity;
import com.percybuilder.jobportalapi.job.Job;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "companies")
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String logo;

    @Column(nullable = false)
    private String industry;

    private String companySize;

    private Double rating;

    private String location;

    private Integer foundedYear;

    @Column(length = 1000)
    private String description;

    private String website;
    @OneToMany(mappedBy = "company", cascade=CascadeType.ALL,  fetch = FetchType.LAZY,  orphanRemoval = true)
    private List<Job> jobs = new ArrayList<>();
}
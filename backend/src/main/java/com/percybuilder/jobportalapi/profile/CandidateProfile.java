package com.percybuilder.jobportalapi.profile;

import com.percybuilder.jobportalapi.common.entity.BaseEntity;
import com.percybuilder.jobportalapi.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "candidate_profiles")
public class CandidateProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String jobTitle;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 50)
    private String experienceLevel;

    @Lob
    @Column(nullable = false)
    private String professionalBio;

    private String portfolioWebsite;

    @Lob
    private byte[] profilePicture;

    private String profilePictureName;

    private String profilePictureType;

    @Lob
    private byte[] resume;

    private String resumeName;

    private String resumeType;
}
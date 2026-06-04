package com.epicode.sportsdata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "job_ads")
@Getter
@Setter
@NoArgsConstructor
public class JobAd extends Content {

    private String companyName;
    private String location;
    private String salaryRange;
    private Double latitude;
    private Double longitude;

}
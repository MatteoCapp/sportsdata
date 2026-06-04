package com.epicode.sportsdata.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
public class Project extends Content {

    private String githubUrl;
    private String liveUrl;
    private String primaryLanguage;
}
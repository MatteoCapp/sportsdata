package com.epicode.sportsdata.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    //relazione bidirezionale per non fargli ricreare la tabella e poter fare da utente a skill e viceversa, da proprietario a inverso
    @ManyToMany(mappedBy = "skills")
    //set da riempire con gli user in base alle skill
    private Set<User> users = new HashSet<>();

}
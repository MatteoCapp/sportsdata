package com.epicode.sportsdata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epicode.sportsdata.entity.Project;

//in teoria è opzionale ma la metto lo stesso
@Repository
//interfaccia, non classe per estendere jparepository e snellire il codice
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
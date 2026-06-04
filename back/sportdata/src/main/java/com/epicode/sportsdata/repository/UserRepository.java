package com.epicode.sportsdata.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epicode.sportsdata.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    //non bastano i metodi base di jparepository quindi faccio derived queries, scelta di Optional per evitare NullPointerException
    //visto che in caso sia vuota la ricerca non sarà null ma una scatola vuota
    Optional<User> findByEmail(String email);

    List<User> findByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(String name, String surname);
}
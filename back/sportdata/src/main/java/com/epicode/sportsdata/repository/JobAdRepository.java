package com.epicode.sportsdata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epicode.sportsdata.entity.JobAd;

@Repository
public interface JobAdRepository extends JpaRepository<JobAd, Long> {

    //filtrare per azienda
    List<JobAd> findByCompanyNameContainingIgnoreCase(String companyName);

    //invece di usare questa potrei scrivere List<JobAd> findByLocationContainingIgnoreCaseOrderByCreatedAtDesc(String location);
    //messa la jplq costum query solo per richiesta di esame
    @Query("SELECT j FROM JobAd j WHERE LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')) ORDER BY j.createdAt DESC")
    List<JobAd> searchByLocationOrderByDate(@Param("location") String location);
}
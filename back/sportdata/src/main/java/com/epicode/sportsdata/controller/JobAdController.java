package com.epicode.sportsdata.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epicode.sportsdata.entity.JobAd;
import com.epicode.sportsdata.service.JobAdService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/job-ads") //prefisso per tutti gli endpoint di questo controller
public class JobAdController {

    private final JobAdService jobAdService;

    public JobAdController(JobAdService jobAdService) {
        this.jobAdService = jobAdService;
    }

    // GET: http://localhost:8080/api/job-ads
    @GetMapping
    public ResponseEntity<List<JobAd>> getAll() {
        return ResponseEntity.ok(jobAdService.getAllJobAds());
    }

    // GET: http://localhost:8080/api/job-ads/search?location=Milano
    @GetMapping("/search")
    public ResponseEntity<List<JobAd>> search(@RequestParam String location) {
        return ResponseEntity.ok(jobAdService.searchByLocation(location));
    }

    // POST: http://localhost:8080/api/job-ads?authorId=1
    // POST: http://localhost:8080/api/job-ads?authorId=1
    @PostMapping
    @PreAuthorize("hasAnyRole('CLUB_RECRUITER', 'ANALYST')") // Entrambi possono creare annunci
    public ResponseEntity<JobAd> create(@RequestParam Long authorId, @RequestBody JobAd jobAd) {
        JobAd createdAd = jobAdService.createJobAd(authorId, jobAd);
        return new ResponseEntity<>(createdAd, HttpStatus.CREATED);
    }

    // DELETE: http://localhost:8080/api/job-ads/1
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('CLUB_RECRUITER', 'ANALYST')")
    public ResponseEntity<String> deleteJobAd(@PathVariable Long id) {
        jobAdService.deleteJobAd(id);
        return ResponseEntity.ok("Annuncio eliminato con successo.");
    }
}
package com.epicode.sportsdata.service;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.epicode.sportsdata.entity.JobAd;
import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.repository.JobAdRepository;

@Service
public class JobAdService {

    private final JobAdRepository jobAdRepository;
    private final UserService userService;
    private final RestTemplate restTemplate;

    public JobAdService(JobAdRepository jobAdRepository, UserService userService) {
        this.jobAdRepository = jobAdRepository;
        this.userService = userService;
        this.restTemplate = new RestTemplate();
    }

    public List<JobAd> getAllJobAds() {
        return jobAdRepository.findAll();
    }

    //ricerca filtrata per location
    public List<JobAd> searchByLocation(String location) {
        return jobAdRepository.searchByLocationOrderByDate(location);
    }

    public JobAd createJobAd(Long authorId, JobAd jobAd) {
        User author = userService.getUserById(authorId);
        jobAd.setAuthor(author);

        //aggiunge le coordinate
        enrichWithCoordinates(jobAd);

        return jobAdRepository.save(jobAd);
    }

    private void enrichWithCoordinates(JobAd jobAd) {

        //se la città inserita è vuota o nulla inutile continuare
        if (jobAd.getLocation() == null || jobAd.getLocation().isBlank()) return;

        try {
            String url = "https://nominatim.openstreetmap.org/search?q=" + jobAd.getLocation() + "&format=json&limit=1";
            
            // OpenStreetMap richiede OBBLIGATORIAMENTE un User-Agent di validazione se no dà errore
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("User-Agent", "SportsDataApp/1.0 (student project)");
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);
            
            //exchange metodo avanzato di spring per fare chiamate webAPI, mappato in un dizionario perchè risposta di OpenStreetMap è sempre Array
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            //prendo solo il primo della lista Array, cerco lat e lon e li converto
            if (response.getBody() != null && !response.getBody().isEmpty()) {
                Map<String, Object> firstResult = response.getBody().get(0);
                jobAd.setLatitude(Double.parseDouble(firstResult.get("lat").toString()));
                jobAd.setLongitude(Double.parseDouble(firstResult.get("lon").toString()));
                System.out.println("Coordinate trovate con successo per: " + jobAd.getLocation());
            }
        } catch (Exception e) {
            System.err.println("Errore geocoding API esterna: " + e.getMessage());
        }
    }
    
    public void deleteJobAd(Long id) {
        if (!jobAdRepository.existsById(id)) {
            throw new RuntimeException("Annuncio non trovato con ID: " + id);
        }
        jobAdRepository.deleteById(id);
    }
}
package com.epicode.sportsdata.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.epicode.sportsdata.entity.Project;
import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.repository.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;
    //suggerita da IA come browser web invisibile per le chiamate API
    private final RestTemplate restTemplate;

    //dependency injection
    public ProjectService(ProjectRepository projectRepository, UserService userService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
        this.restTemplate = new RestTemplate();
    }

    //da leggere tutti i progetti
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    //userserver per trovare utente per ID, se lo trova lo connette al autore
    public Project createProject(Long authorId, Project project) {
        User author = userService.getUserById(authorId);
        project.setAuthor(author);

        // chiamata github se url valido e enrichWithGitHubData per trovare il linguaggio automaticamente
        if (project.getGithubUrl() != null && !project.getGithubUrl().isBlank()) {
            enrichWithGitHubData(project);
        }

        return projectRepository.save(project);
    }

    private void enrichWithGitHubData(Project project) {
        try {

            //prima parte per avere solo autore e nome del progetto, poi lo metto in array già diviso
            String url = project.getGithubUrl().replace("https://github.com/", "");
            String[] parts = url.split("/");
            
            //questo if viene saltato se ha messo la pagina principale di github
            if (parts.length >= 2) {
                String owner = parts[0];
                String repo = parts[1];
                
                //qui ririempio l'url
                String apiUrl = String.format("https://api.github.com/repos/%s/%s", owner, repo);
                
                //qua mappiamo il risultato della API in un dizionario
                @SuppressWarnings("unchecked")
                Map<String, Object> response = restTemplate.getForObject(apiUrl, Map.class);
                
                //estraiamo solo il linguaggio 
                if (response != null && response.containsKey("language")) {
                    project.setPrimaryLanguage((String) response.get("language"));
                }
            }
        } catch (Exception e) {
            // Se GitHub è offline o l'URL è errato, non blocchiamo il salvataggio del progetto
            System.err.println("Impossibile recuperare dati da GitHub: " + e.getMessage());
            project.setPrimaryLanguage("Unknown");
        }
    }

    //opzione di cancellazione del progetto
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Progetto non trovato con ID: " + id);
        }
        projectRepository.deleteById(id);
    }
}
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

import com.epicode.sportsdata.entity.Project;
import com.epicode.sportsdata.service.ProjectService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PostMapping
    @PreAuthorize("hasRole('ANALYST')") //solo analista può accedere
    public ResponseEntity<Project> create(@RequestParam Long authorId, @RequestBody Project project) {
        Project createdProject = projectService.createProject(authorId, project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }
    // DELETE: http://localhost:8080/api/projects/1
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ANALYST')") //solo analista può eliminare i propri progetti
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Progetto eliminato con successo.");
    }
}
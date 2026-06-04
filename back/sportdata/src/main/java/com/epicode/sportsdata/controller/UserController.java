package com.epicode.sportsdata.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epicode.sportsdata.entity.User;
import com.epicode.sportsdata.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // PATCH: http://localhost:8080/api/users/1/profile-image
    @PatchMapping("/{id}/profile-image")
    public ResponseEntity<User> updateProfileImage(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String imageUrl = body.get("profileImage");
        User updatedUser = userService.updateProfileImage(id, imageUrl);
        return ResponseEntity.ok(updatedUser);
    }
}
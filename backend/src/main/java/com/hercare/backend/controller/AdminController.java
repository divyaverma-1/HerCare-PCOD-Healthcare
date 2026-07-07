package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.response.UserResponse;
import com.hercare.backend.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public String adminDashboard() {

        return "Welcome Admin! 👨‍💼";
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<String> deactivateUser(
            @PathVariable Long id) {

        userService.deactivateUser(id);

        return ResponseEntity.ok("User deactivated successfully.");
    }

    @PutMapping("/users/{id}/activate")
    public ResponseEntity<String> activateUser(
            @PathVariable Long id) {

        userService.activateUser(id);

        return ResponseEntity.ok("User activated successfully.");
    }
}

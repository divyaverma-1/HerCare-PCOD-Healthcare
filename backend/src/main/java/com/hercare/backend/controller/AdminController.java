package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.response.DoctorProfileResponse;
import com.hercare.backend.dto.response.UserResponse;
import com.hercare.backend.service.DoctorProfileService;
import com.hercare.backend.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    private final DoctorProfileService doctorProfileService;

    public AdminController(
            UserService userService,
            DoctorProfileService doctorProfileService) {

        this.userService = userService;
        this.doctorProfileService = doctorProfileService;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {
        return "Welcome Admin! 👨‍💼";
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")

    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<String> deactivateUser(
            @PathVariable Long id) {

        userService.deactivateUser(id);

        return ResponseEntity.ok(
                "User deactivated successfully."
        );
    }

    @PutMapping("/users/{id}/activate")
    public ResponseEntity<String> activateUser(
            @PathVariable Long id) {

        userService.activateUser(id);

        return ResponseEntity.ok(
                "User activated successfully."
        );
    }

    // ================= DOCTOR MANAGEMENT =================
    @GetMapping("/doctors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DoctorProfileResponse>>
            getAllDoctors() {

        return ResponseEntity.ok(
                doctorProfileService.getAllDoctorProfiles()
        );
    }

}

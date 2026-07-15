package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.response.DoctorProfileResponse;
import com.hercare.backend.dto.response.UserResponse;
import com.hercare.backend.service.AdminService;
import com.hercare.backend.service.DoctorProfileService;
import com.hercare.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin", description = "Administrator Management APIs")
public class AdminController {

    private final UserService userService;
    private final DoctorProfileService doctorProfileService;
    private final AdminService adminService;

    public AdminController(
            UserService userService,
            DoctorProfileService doctorProfileService,
            AdminService adminService) {

        this.userService = userService;
        this.doctorProfileService = doctorProfileService;
        this.adminService = adminService;
    }

    @Operation(summary = "Admin Dashboard")
    @ApiResponse(responseCode = "200", description = "Dashboard loaded")
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {
        return "Welcome Admin! 👨‍💼";
    }

    @Operation(summary = "Get All Users")
    @ApiResponse(responseCode = "200", description = "Users retrieved successfully")
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(summary = "Deactivate User")
    @ApiResponse(responseCode = "200", description = "User deactivated successfully")
    @PutMapping("/users/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deactivateUser(
            @PathVariable Long id) {

        userService.deactivateUser(id);

        return ResponseEntity.ok("User deactivated successfully.");
    }

    @Operation(summary = "Activate User")
    @ApiResponse(responseCode = "200", description = "User activated successfully")
    @PutMapping("/users/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> activateUser(
            @PathVariable Long id) {

        userService.activateUser(id);

        return ResponseEntity.ok("User activated successfully.");
    }

    @Operation(summary = "Get All Doctors")
    @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    @GetMapping("/doctors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DoctorProfileResponse>> getAllDoctors() {

        return ResponseEntity.ok(
                doctorProfileService.getAllDoctorProfiles());
    }

    @Operation(summary = "Get Pending Doctors")
    @ApiResponse(responseCode = "200", description = "Pending doctors retrieved successfully")
    @GetMapping("/pending-doctors")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getPendingDoctors() {

        return ResponseEntity.ok(
                adminService.getPendingDoctors());
    }

    @Operation(summary = "Approve Doctor")
    @ApiResponse(responseCode = "200", description = "Doctor approved successfully")
    @PutMapping("/doctors/{doctorId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approveDoctor(
            @PathVariable Long doctorId) {

        adminService.approveDoctor(doctorId);

        return ResponseEntity.ok("Doctor approved successfully.");
    }

    @Operation(summary = "Reject Doctor")
    @ApiResponse(responseCode = "200", description = "Doctor rejected successfully")
    @PutMapping("/doctors/{doctorId}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> rejectDoctor(
            @PathVariable Long doctorId) {

        adminService.rejectDoctor(doctorId);

        return ResponseEntity.ok("Doctor rejected successfully.");
    }
}

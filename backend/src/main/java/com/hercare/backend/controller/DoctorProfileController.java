package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.DoctorAvailabilityRequest;
import com.hercare.backend.dto.request.DoctorProfileRequest;
import com.hercare.backend.dto.response.DoctorAvailabilityResponse;
import com.hercare.backend.dto.response.DoctorProfileResponse;
import com.hercare.backend.enums.DoctorSpecialization;
import com.hercare.backend.service.DoctorProfileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@Tag(
        name = "Doctor Profile",
        description = "Doctor Profile, Search and Availability Management APIs"
)
public class DoctorProfileController {

    private final DoctorProfileService doctorProfileService;

    // ================= PATIENT =================
    @Operation(
            summary = "Get All Doctors",
            description = "Returns all approved doctors available in the system."
    )
    @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorProfileResponse>> getAllDoctors() {

        return ResponseEntity.ok(
                doctorProfileService.getAllDoctors());
    }

    @Operation(
            summary = "Get Doctor By ID",
            description = "Returns doctor profile details using doctor ID."
    )
    @ApiResponse(responseCode = "200", description = "Doctor profile retrieved successfully")
    @ApiResponse(responseCode = "404", description = "Doctor not found")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<DoctorProfileResponse> getDoctor(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorProfileService.getDoctorById(id));
    }

    @Operation(
            summary = "Search Doctor",
            description = "Search doctors using their full name."
    )
    @ApiResponse(responseCode = "200", description = "Search completed successfully")
    @GetMapping("/search")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorProfileResponse>> searchDoctor(
            @RequestParam String name) {

        return ResponseEntity.ok(
                doctorProfileService.searchDoctors(name));
    }

    @Operation(
            summary = "Search Doctors by Specialization",
            description = "Returns doctors based on selected specialization."
    )
    @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    @GetMapping("/specialization/{specialization}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorProfileResponse>>
            getBySpecialization(
                    @PathVariable DoctorSpecialization specialization) {

        return ResponseEntity.ok(
                doctorProfileService
                        .getBySpecialization(specialization));
    }

    // ================= DOCTOR PROFILE =================
    @Operation(
            summary = "Create Doctor Profile",
            description = "Creates a doctor profile after doctor registration."
    )
    @ApiResponse(responseCode = "200", description = "Doctor profile created successfully")
    @PostMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> createProfile(
            @RequestBody DoctorProfileRequest request) {

        return ResponseEntity.ok(
                doctorProfileService.createProfile(request));
    }

    @Operation(
            summary = "Update Doctor Profile",
            description = "Updates the logged-in doctor's profile."
    )
    @ApiResponse(responseCode = "200", description = "Doctor profile updated successfully")
    @PutMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> updateProfile(
            @RequestBody DoctorProfileRequest request) {

        return ResponseEntity.ok(
                doctorProfileService.updateProfile(request));
    }

    @Operation(
            summary = "Get My Doctor Profile",
            description = "Returns the logged-in doctor's profile."
    )
    @ApiResponse(responseCode = "200", description = "Doctor profile retrieved successfully")
    @GetMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> getMyProfile() {

        return ResponseEntity.ok(
                doctorProfileService.getMyProfile());
    }

    // ================= AVAILABILITY =================
    @Operation(
            summary = "Add Doctor Availability",
            description = "Adds available consultation slots for the logged-in doctor."
    )
    @ApiResponse(responseCode = "200", description = "Availability added successfully")
    @PostMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorAvailabilityResponse>
            addAvailability(
                    @RequestBody DoctorAvailabilityRequest request) {

        return ResponseEntity.ok(
                doctorProfileService
                        .addAvailability(request));
    }

    @Operation(
            summary = "Update Doctor Availability",
            description = "Updates an existing availability slot."
    )
    @ApiResponse(responseCode = "200", description = "Availability updated successfully")
    @PutMapping("/availability/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorAvailabilityResponse>
            updateAvailability(
                    @PathVariable Long id,
                    @RequestBody DoctorAvailabilityRequest request) {

        return ResponseEntity.ok(
                doctorProfileService
                        .updateAvailability(id, request));
    }

    @Operation(
            summary = "Get My Availability",
            description = "Returns all availability slots of the logged-in doctor."
    )
    @ApiResponse(responseCode = "200", description = "Availability retrieved successfully")
    @GetMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<DoctorAvailabilityResponse>>
            getMyAvailability() {

        return ResponseEntity.ok(
                doctorProfileService
                        .getMyAvailability());
    }

}

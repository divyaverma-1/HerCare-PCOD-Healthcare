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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorProfileController {

    private final DoctorProfileService doctorProfileService;

    // ================= PATIENT =================
    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorProfileResponse>> getAllDoctors() {

        return ResponseEntity.ok(
                doctorProfileService.getAllDoctors());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<DoctorProfileResponse> getDoctor(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorProfileService.getDoctorById(id));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<DoctorProfileResponse>> searchDoctor(
            @RequestParam String name) {

        return ResponseEntity.ok(
                doctorProfileService.searchDoctors(name));
    }

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
    @PostMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> createProfile(
            @RequestBody DoctorProfileRequest request) {

        return ResponseEntity.ok(
                doctorProfileService.createProfile(request));

    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> updateProfile(
            @RequestBody DoctorProfileRequest request) {

        return ResponseEntity.ok(
                doctorProfileService.updateProfile(request));

    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorProfileResponse> getMyProfile() {

        return ResponseEntity.ok(
                doctorProfileService.getMyProfile());

    }

    // ================= AVAILABILITY =================
    @PostMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<DoctorAvailabilityResponse>
            addAvailability(
                    @RequestBody DoctorAvailabilityRequest request) {

        return ResponseEntity.ok(
                doctorProfileService
                        .addAvailability(request));

    }

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

    @GetMapping("/availability")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<DoctorAvailabilityResponse>>
            getMyAvailability() {

        return ResponseEntity.ok(
                doctorProfileService
                        .getMyAvailability());

    }

}

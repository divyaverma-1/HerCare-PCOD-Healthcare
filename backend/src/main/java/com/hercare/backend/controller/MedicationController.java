package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.MedicationRequest;
import com.hercare.backend.dto.response.MedicationResponse;
import com.hercare.backend.service.MedicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medications")
@Tag(name = "Medication Reminder", description = "Medication Reminder APIs")
public class MedicationController {

    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @Operation(
            summary = "Add Medication",
            description = "Adds a medication reminder for the logged-in user."
    )
    @ApiResponse(responseCode = "201", description = "Medication added successfully")
    @ApiResponse(responseCode = "400", description = "Invalid medication details")
    @PostMapping
    public ResponseEntity<MedicationResponse> addMedication(
            @Valid @RequestBody MedicationRequest request) {

        MedicationResponse response = medicationService.addMedication(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "View My Medications",
            description = "Returns all medication reminders of the logged-in user."
    )
    @ApiResponse(responseCode = "200", description = "Medication list retrieved successfully")
    @GetMapping
    public ResponseEntity<List<MedicationResponse>> getMyMedications() {

        List<MedicationResponse> response = medicationService.getMyMedications();

        return ResponseEntity.ok(response);
    }
}

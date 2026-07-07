package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.MedicationRequest;
import com.hercare.backend.dto.response.MedicationResponse;
import com.hercare.backend.service.MedicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @PostMapping
    public ResponseEntity<MedicationResponse> addMedication(
            @Valid @RequestBody MedicationRequest request) {

        MedicationResponse response = medicationService.addMedication(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MedicationResponse>> getMyMedications() {

        List<MedicationResponse> response = medicationService.getMyMedications();

        return ResponseEntity.ok(response);
    }
}

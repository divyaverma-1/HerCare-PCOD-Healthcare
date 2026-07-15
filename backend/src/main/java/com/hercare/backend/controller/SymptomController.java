package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.SymptomRequest;
import com.hercare.backend.dto.response.SymptomResponse;
import com.hercare.backend.service.SymptomService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/symptoms")
@Tag(name = "Symptom Tracker", description = "PCOD Symptom Tracking APIs")
public class SymptomController {

    private final SymptomService symptomService;

    public SymptomController(SymptomService symptomService) {
        this.symptomService = symptomService;
    }

    @Operation(
            summary = "Add Symptom",
            description = "Adds a new symptom record for the logged-in user."
    )
    @ApiResponse(responseCode = "201", description = "Symptom added successfully")
    @ApiResponse(responseCode = "400", description = "Invalid symptom details")
    @PostMapping
    public ResponseEntity<SymptomResponse> addSymptom(
            @Valid @RequestBody SymptomRequest request) {

        SymptomResponse response = symptomService.addSymptom(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "View My Symptoms",
            description = "Returns all symptom records of the logged-in user."
    )
    @ApiResponse(responseCode = "200", description = "Symptoms retrieved successfully")
    @GetMapping
    public ResponseEntity<List<SymptomResponse>> getMySymptoms() {

        List<SymptomResponse> response = symptomService.getMySymptoms();

        return ResponseEntity.ok(response);
    }
}

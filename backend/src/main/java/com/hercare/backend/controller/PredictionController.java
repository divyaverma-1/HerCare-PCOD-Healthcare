package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.PredictionRequest;
import com.hercare.backend.dto.response.PredictionResponse;
import com.hercare.backend.service.PredictionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
@Tag(name = "Prediction", description = "PCOD Prediction APIs")
public class PredictionController {

    private final PredictionService predictionService;

    @Operation(
            summary = "Predict PCOD Risk",
            description = "Predicts the PCOD risk based on the symptoms provided by the patient."
    )
    @ApiResponse(responseCode = "200", description = "Prediction generated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid prediction request")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PredictionResponse> predict(
            @RequestBody PredictionRequest request) {

        return ResponseEntity.ok(
                predictionService.predict(request));
    }

    @Operation(
            summary = "Prediction History",
            description = "Returns all previous prediction results of the logged-in patient."
    )
    @ApiResponse(responseCode = "200", description = "Prediction history retrieved successfully")
    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<PredictionResponse>> getPredictionHistory() {

        return ResponseEntity.ok(
                predictionService.getPredictionHistory());
    }
}

package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.PredictionRequest;
import com.hercare.backend.dto.response.PredictionResponse;
import com.hercare.backend.service.PredictionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<PredictionResponse> predict(
            @RequestBody PredictionRequest request) {

        return ResponseEntity.ok(
                predictionService.predict(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<PredictionResponse>> getPredictionHistory() {

        return ResponseEntity.ok(
                predictionService.getPredictionHistory());
    }

}

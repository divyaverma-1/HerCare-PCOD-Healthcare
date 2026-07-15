package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.response.HealthTipResponse;
import com.hercare.backend.service.HealthTipService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/health-tips")
@RequiredArgsConstructor
@Tag(name = "Health Tips", description = "Personalized Health Tips APIs")
public class HealthTipController {

    private final HealthTipService healthTipService;

    @Operation(
            summary = "Get Personalized Health Tips",
            description = "Returns personalized health tips for the logged-in patient."
    )
    @ApiResponse(responseCode = "200", description = "Health tips retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<HealthTipResponse>> getHealthTips() {

        return ResponseEntity.ok(
                healthTipService.getPersonalizedTips());
    }
}

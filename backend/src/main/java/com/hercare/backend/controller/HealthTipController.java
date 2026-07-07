package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.response.HealthTipResponse;
import com.hercare.backend.service.HealthTipService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/health-tips")
@RequiredArgsConstructor
public class HealthTipController {

    private final HealthTipService healthTipService;

    @GetMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<HealthTipResponse>> getHealthTips() {

        return ResponseEntity.ok(
                healthTipService.getPersonalizedTips());
    }
}

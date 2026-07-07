package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.SymptomRequest;
import com.hercare.backend.dto.response.SymptomResponse;
import com.hercare.backend.service.SymptomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    private final SymptomService symptomService;

    public SymptomController(SymptomService symptomService) {
        this.symptomService = symptomService;
    }

    @PostMapping
    public ResponseEntity<SymptomResponse> addSymptom(
            @Valid @RequestBody SymptomRequest request) {

        SymptomResponse response = symptomService.addSymptom(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SymptomResponse>> getMySymptoms() {

        List<SymptomResponse> response = symptomService.getMySymptoms();

        return ResponseEntity.ok(response);
    }
}

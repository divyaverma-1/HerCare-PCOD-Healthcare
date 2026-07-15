package com.hercare.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(
        name = "Protected",
        description = "Protected Patient APIs"
)
public class ProtectedController {

    @Operation(
            summary = "Patient Profile",
            description = "Simple protected endpoint for testing authenticated patient access."
    )
    @GetMapping("/api/patient/profile")
    public String patientProfile() {

        return "Welcome Patient 🌸";
    }
}

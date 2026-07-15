package com.hercare.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(
        name = "Doctor Dashboard",
        description = "Doctor dashboard endpoint"
)
public class DoctorController {

    @Operation(
            summary = "Doctor Dashboard",
            description = "Simple dashboard endpoint for authenticated doctors."
    )
    @GetMapping("/api/doctor/dashboard")
    public String doctorDashboard() {

        return "Welcome Doctor! 👩‍⚕️";
    }
}

package com.hercare.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProtectedController {

    @GetMapping("/api/patient/profile")
    public String patientProfile() {
        return "Welcome Patient 🌸";
    }

}

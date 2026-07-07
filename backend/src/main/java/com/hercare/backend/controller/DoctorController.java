package com.hercare.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DoctorController {

    @GetMapping("/api/doctor/dashboard")
    public String doctorDashboard() {

        return "Welcome Doctor! 👩‍⚕️";
    }
}

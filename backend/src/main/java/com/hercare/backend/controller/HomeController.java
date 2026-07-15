package com.hercare.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(
        name = "Home",
        description = "Application Home API"
)
public class HomeController {

    @Operation(
            summary = "Home",
            description = "Returns welcome message of HerCare backend."
    )
    @GetMapping("/")
    public String home() {

        return "Welcome to HerCare Backend 🌸";
    }
}

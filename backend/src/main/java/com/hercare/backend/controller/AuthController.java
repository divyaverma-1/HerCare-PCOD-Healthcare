package com.hercare.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.LoginRequest;
import com.hercare.backend.dto.request.RegisterRequest;
import com.hercare.backend.dto.response.LoginResponse;
import com.hercare.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication APIs for registration and login")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Register a new user",
            description = "Registers a new Patient, Doctor, or Admin account."
    )
    @ApiResponse(responseCode = "201", description = "User registered successfully")
    @ApiResponse(responseCode = "400", description = "Validation failed")
    @ApiResponse(responseCode = "409", description = "Email or Phone Number already exists")
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return new ResponseEntity<>(
                "User Registered Successfully!",
                HttpStatus.CREATED
        );
    }

    @Operation(
            summary = "Login",
            description = "Authenticates the user and returns a JWT token."
    )
    @ApiResponse(responseCode = "200", description = "Login Successful")
    @ApiResponse(responseCode = "401", description = "Invalid email or password")
    @ApiResponse(responseCode = "403", description = "Doctor account pending approval or rejected")
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                userService.loginUser(request)
        );
    }
}

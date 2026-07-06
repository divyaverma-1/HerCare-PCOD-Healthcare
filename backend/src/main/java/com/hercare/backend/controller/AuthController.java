package com.hercare.backend.controller;

import com.hercare.backend.dto.request.RegisterRequest;
import com.hercare.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        userService.registerUser(request);

        return new ResponseEntity<>(
                "User Registered Successfully!",
                HttpStatus.CREATED
        );
    }
}

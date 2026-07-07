package com.hercare.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.UpdateProfileRequest;
import com.hercare.backend.dto.response.UserProfileResponse;
import com.hercare.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/profile")
    public ResponseEntity<UserProfileResponse> getMyProfile() {

        UserProfileResponse profile = userService.getMyProfile();

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/api/profile")
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateProfileRequest request) {

        UserProfileResponse profile
                = userService.updateMyProfile(request);

        return ResponseEntity.ok(profile);
    }
}

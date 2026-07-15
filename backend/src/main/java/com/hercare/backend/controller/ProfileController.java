package com.hercare.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.UpdateProfileRequest;
import com.hercare.backend.dto.response.UserProfileResponse;
import com.hercare.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@Tag(
        name = "Profile",
        description = "Logged-in User Profile APIs"
)
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Get My Profile",
            description = "Returns profile details of the currently logged-in user."
    )
    @ApiResponse(responseCode = "200", description = "Profile fetched successfully")
    @GetMapping("/api/profile")
    public ResponseEntity<UserProfileResponse> getMyProfile() {

        UserProfileResponse profile = userService.getMyProfile();

        return ResponseEntity.ok(profile);
    }

    @Operation(
            summary = "Update My Profile",
            description = "Updates profile information of the logged-in user."
    )
    @ApiResponse(responseCode = "200", description = "Profile updated successfully")
    @PutMapping("/api/profile")
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            @Valid @RequestBody UpdateProfileRequest request) {

        UserProfileResponse profile
                = userService.updateMyProfile(request);

        return ResponseEntity.ok(profile);
    }
}

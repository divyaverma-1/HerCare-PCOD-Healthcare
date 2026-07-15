package com.hercare.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request object used for user login")
public class LoginRequest {

    @Schema(
            description = "Registered email address",
            example = "divya@example.com"
    )
    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @Schema(
            description = "Account password",
            example = "Password@123"
    )
    @NotBlank(message = "Password is required")
    private String password;
}

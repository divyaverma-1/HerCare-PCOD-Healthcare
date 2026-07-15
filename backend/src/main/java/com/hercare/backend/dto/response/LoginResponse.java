package com.hercare.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Response returned after successful user authentication")
public class LoginResponse {

    @Schema(
            description = "JWT authentication token",
            example = "eyJhbGciOiJIUzI1NiJ9..."
    )
    private String token;

    @Schema(
            description = "Role of the authenticated user",
            example = "PATIENT"
    )
    private String role;

    @Schema(
            description = "Response message",
            example = "Login successful"
    )
    private String message;
}

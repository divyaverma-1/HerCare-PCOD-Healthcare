package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response object containing the authenticated user's profile information")
public class UserProfileResponse {

    @Schema(
            description = "Unique identifier of the user",
            example = "1"
    )
    private Long id;

    @Schema(
            description = "Full name of the user",
            example = "Divya Verma"
    )
    private String fullName;

    @Schema(
            description = "Registered email address",
            example = "divya@example.com"
    )
    private String email;

    @Schema(
            description = "10-digit mobile number",
            example = "9876543210"
    )
    private String phoneNumber;

    @Schema(
            description = "Date of birth",
            example = "2005-08-15"
    )
    private LocalDate dateOfBirth;

    @Schema(
            description = "Gender of the user",
            example = "FEMALE"
    )
    private Gender gender;

    @Schema(
            description = "Role assigned to the user",
            example = "PATIENT"
    )
    private String role;
}

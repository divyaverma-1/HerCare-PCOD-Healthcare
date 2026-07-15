package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request object used to update the authenticated user's profile")
public class UpdateProfileRequest {

    @Schema(
            description = "Full name of the user",
            example = "Divya Verma"
    )
    @NotBlank(message = "Full Name is required")
    private String fullName;

    @Schema(
            description = "10-digit mobile number",
            example = "9876543210"
    )
    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;

    @Schema(
            description = "Date of birth of the user",
            example = "2005-08-15"
    )
    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @Schema(
            description = "Gender of the user",
            example = "FEMALE"
    )
    @NotNull(message = "Gender is required")
    private Gender gender;
}

package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;
import com.hercare.backend.enums.Role;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
@Schema(description = "Request object used for user registration")
public class RegisterRequest {

    @Schema(
            description = "Full name of the user",
            example = "Divya Verma"
    )
    @NotBlank(message = "Full Name is required")
    private String fullName;

    @Schema(
            description = "User email address",
            example = "divya@example.com"
    )
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Schema(
            description = "User password (minimum 8 characters)",
            example = "Password@123"
    )
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Schema(
            description = "10-digit mobile number",
            example = "9876543210"
    )
    @NotBlank(message = "Phone Number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone Number must contain exactly 10 digits"
    )
    private String phoneNumber;

    @Schema(
            description = "User date of birth",
            example = "2005-08-15"
    )
    @Past(message = "Date of birth must be in the past")
    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @Schema(
            description = "Gender of the user",
            example = "FEMALE"
    )
    @NotNull(message = "Gender is required")
    private Gender gender;

    @Schema(
            description = "Role assigned to the user",
            example = "PATIENT"
    )
    @NotNull(message = "Role is required")
    private Role role;
}

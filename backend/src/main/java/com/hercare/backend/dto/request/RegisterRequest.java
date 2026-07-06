package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class RegisterRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Phone Number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone Number must contain exactly 10 digits"
    )
    private String phoneNumber;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Gender gender;
}

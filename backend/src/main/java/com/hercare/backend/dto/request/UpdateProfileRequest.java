package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;

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
public class UpdateProfileRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotBlank(message = "Phone Number is required")
    private String phoneNumber;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    private Gender gender;
}

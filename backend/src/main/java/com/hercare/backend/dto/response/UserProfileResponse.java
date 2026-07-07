package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private Long id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private LocalDate dateOfBirth;

    private Gender gender;

    private String role;
}

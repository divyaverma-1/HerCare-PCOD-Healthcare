package com.hercare.backend.dto.response;

import com.hercare.backend.enums.DoctorSpecialization;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing user details for administrative operations")
public class UserResponse {

    @Schema(description = "User ID", example = "1")
    private Long id;

    @Schema(description = "Full name of the user", example = "Divya Verma")
    private String fullName;

    @Schema(description = "Registered email address", example = "divya@example.com")
    private String email;

    @Schema(description = "Registered mobile number", example = "9876543210")
    private String phoneNumber;

    @Schema(description = "Gender of the user", example = "FEMALE")
    private String gender;

    @Schema(description = "Role assigned to the user", example = "DOCTOR")
    private String role;

    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean active;

    // ================= Doctor Verification Details =================
    @Schema(
            description = "Medical Registration Number",
            example = "DLMC123456"
    )
    private String medicalRegistrationNumber;

    @Schema(
            description = "Medical Council",
            example = "Delhi Medical Council"
    )
    private String medicalCouncil;

    @Schema(
            description = "Doctor Specialization",
            example = "GYNECOLOGIST"
    )
    private DoctorSpecialization specialization;

    @Schema(
            description = "Hospital Name",
            example = "Apollo Hospital"
    )
    private String hospitalName;

    @Schema(
            description = "Whether doctor's registration has been verified",
            example = "false"
    )
    private Boolean registrationVerified;
}

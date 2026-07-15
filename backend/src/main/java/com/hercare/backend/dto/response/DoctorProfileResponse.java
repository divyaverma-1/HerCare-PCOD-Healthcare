package com.hercare.backend.dto.response;

import com.hercare.backend.enums.DoctorSpecialization;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing a doctor's professional profile")
public class DoctorProfileResponse {

    @Schema(description = "Doctor profile ID", example = "1")
    private Long id;

    @Schema(description = "Doctor user ID", example = "2")
    private Long doctorId;

    @Schema(description = "Doctor's full name", example = "Dr. Priya Sharma")
    private String doctorName;

    @Schema(description = "Doctor's email address", example = "priya@example.com")
    private String email;

    @Schema(description = "Doctor's contact number", example = "9876543210")
    private String phoneNumber;

    @Schema(description = "Medical qualification", example = "MBBS, MD (Gynecology)")
    private String qualification;

    @Schema(description = "Years of experience", example = "8")
    private Integer experience;

    @Schema(description = "Medical specialization", example = "GYNECOLOGIST")
    private DoctorSpecialization specialization;

    @Schema(description = "Hospital or clinic name", example = "City Care Hospital")
    private String hospitalName;

    @Schema(description = "Professional summary", example = "Experienced gynecologist specializing in PCOD treatment.")
    private String about;

    @Schema(description = "Whether the doctor's account is active", example = "true")
    private Boolean active;

    @Schema(description = "Consultation fee in INR", example = "700.0")
    private Double consultationFee;
}

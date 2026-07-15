package com.hercare.backend.dto.request;

import com.hercare.backend.enums.DoctorSpecialization;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request object used to create or update a doctor's professional profile")
public class DoctorProfileRequest {

    @Schema(
            description = "Highest medical qualification of the doctor",
            example = "MBBS, MD (Gynecology)"
    )
    private String qualification;

    @Schema(
            description = "Years of professional experience",
            example = "8"
    )
    private Integer experience;

    @Schema(
            description = "Doctor's medical specialization",
            example = "GYNECOLOGIST"
    )
    private DoctorSpecialization specialization;

    @Schema(
            description = "Hospital or clinic where the doctor practices",
            example = "City Care Hospital"
    )
    private String hospitalName;

    @Schema(
            description = "Brief professional introduction",
            example = "Experienced gynecologist specializing in PCOD and women's reproductive health."
    )
    private String about;

    @Schema(
            description = "Consultation fee in INR",
            example = "700.0"
    )
    private Double consultationFee;

    // private ConsultationMode consultationMode;
}

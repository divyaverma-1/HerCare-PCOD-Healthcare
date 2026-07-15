package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Severity;
import com.hercare.backend.enums.SymptomType;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

@Data
@Schema(description = "Request object for recording PCOD-related symptoms")
public class SymptomRequest {

    @Schema(
            description = "Type of symptom experienced",
            example = "PELVIC_PAIN"
    )
    @NotNull(message = "Symptom type is required")
    private SymptomType symptomType;

    @Schema(
            description = "Severity level of the symptom",
            example = "HIGH"
    )
    @NotNull(message = "Severity is required")
    private Severity severity;

    @Schema(
            description = "Date when the symptom occurred",
            example = "2026-07-15"
    )
    @NotNull(message = "Date is required")
    @PastOrPresent(message = "Date cannot be in the future")
    private LocalDate date;

    @Schema(
            description = "Additional notes about the symptom",
            example = "Severe pelvic pain during the first day of the menstrual cycle."
    )
    private String notes;
}

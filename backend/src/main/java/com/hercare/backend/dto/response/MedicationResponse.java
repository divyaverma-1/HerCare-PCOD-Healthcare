package com.hercare.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.MedicationFrequency;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response containing medication reminder details")
public class MedicationResponse {

    @Schema(description = "Unique medication record ID", example = "7")
    private Long id;

    @Schema(description = "Medicine name", example = "Metformin")
    private String medicineName;

    @Schema(description = "Medicine dosage", example = "500 mg")
    private String dosage;

    @Schema(description = "Medication start date", example = "2026-07-15")
    private LocalDate startDate;

    @Schema(description = "Medication end date", example = "2026-08-15")
    private LocalDate endDate;

    @Schema(description = "Daily reminder time", example = "09:00:00")
    private LocalTime reminderTime;

    @Schema(description = "Medication frequency", example = "DAILY")
    private MedicationFrequency frequency;
}

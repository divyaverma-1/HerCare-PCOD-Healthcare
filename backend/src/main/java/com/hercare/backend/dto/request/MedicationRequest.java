package com.hercare.backend.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.MedicationFrequency;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Request object for adding a medication reminder")
public class MedicationRequest {

    @Schema(
            description = "Name of the medicine",
            example = "Metformin"
    )
    @NotBlank(message = "Medicine name is required")
    private String medicineName;

    @Schema(
            description = "Medicine dosage",
            example = "500 mg"
    )
    @NotBlank(message = "Dosage is required")
    private String dosage;

    @Schema(
            description = "Medication start date",
            example = "2026-07-15"
    )
    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDate startDate;

    @Schema(
            description = "Medication end date",
            example = "2026-08-15"
    )
    @NotNull(message = "End date is required")
    @FutureOrPresent(message = "End date cannot be in the past")
    private LocalDate endDate;

    @Schema(
            description = "Daily reminder time",
            example = "09:00:00"
    )
    @NotNull(message = "Reminder time is required")
    private LocalTime reminderTime;

    @Schema(
            description = "Medication frequency",
            example = "DAILY"
    )
    @NotNull(message = "Frequency is required")
    private MedicationFrequency frequency;
}

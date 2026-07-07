package com.hercare.backend.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.MedicationFrequency;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MedicationRequest {

    @NotBlank(message = "Medicine name is required")
    private String medicineName;

    @NotBlank(message = "Dosage is required")
    private String dosage;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Reminder time is required")
    private LocalTime reminderTime;

    @NotNull(message = "Frequency is required")
    private MedicationFrequency frequency;

}

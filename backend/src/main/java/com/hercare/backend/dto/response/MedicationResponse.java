package com.hercare.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.MedicationFrequency;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicationResponse {

    private Long id;

    private String medicineName;

    private String dosage;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime reminderTime;

    private MedicationFrequency frequency;

}

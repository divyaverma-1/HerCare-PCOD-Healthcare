package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.Severity;
import com.hercare.backend.enums.SymptomType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SymptomRequest {

    @NotNull(message = "Symptom type is required")
    private SymptomType symptomType;

    @NotNull(message = "Severity is required")
    private Severity severity;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private String notes;

}

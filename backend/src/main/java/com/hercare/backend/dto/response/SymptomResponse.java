package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.Severity;
import com.hercare.backend.enums.SymptomType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SymptomResponse {

    private Long id;

    private SymptomType symptomType;

    private Severity severity;

    private LocalDate date;

    private String notes;

}

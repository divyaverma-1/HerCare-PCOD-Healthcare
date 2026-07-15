package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.Severity;
import com.hercare.backend.enums.SymptomType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response containing a recorded symptom")
public class SymptomResponse {

    @Schema(description = "Unique symptom record ID", example = "10")
    private Long id;

    @Schema(description = "Type of symptom", example = "PELVIC_PAIN")
    private SymptomType symptomType;

    @Schema(description = "Severity level of the symptom", example = "HIGH")
    private Severity severity;

    @Schema(description = "Date when the symptom occurred", example = "2026-07-15")
    private LocalDate date;

    @Schema(
            description = "Additional notes about the symptom",
            example = "Severe pelvic pain during the first day of the menstrual cycle."
    )
    private String notes;
}

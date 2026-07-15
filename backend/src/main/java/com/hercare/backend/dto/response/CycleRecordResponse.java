package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.CycleFlow;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing a menstrual cycle record")
public class CycleRecordResponse {

    @Schema(description = "Unique cycle record ID", example = "1")
    private Long id;

    @Schema(description = "Start date of the menstrual period", example = "2026-07-01")
    private LocalDate periodStartDate;

    @Schema(description = "End date of the menstrual period", example = "2026-07-05")
    private LocalDate periodEndDate;

    @Schema(description = "Average menstrual cycle length in days", example = "28")
    private Integer cycleLength;

    @Schema(description = "Duration of the menstrual period in days", example = "5")
    private Integer periodLength;

    @Schema(description = "Menstrual flow intensity", example = "MEDIUM")
    private CycleFlow flow;
}

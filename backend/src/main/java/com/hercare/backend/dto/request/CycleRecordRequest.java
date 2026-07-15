package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.CycleFlow;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Request object for adding a menstrual cycle record")
public class CycleRecordRequest {

    @Schema(
            description = "First day of the menstrual period",
            example = "2026-07-01"
    )
    @NotNull(message = "Period start date is required")
    private LocalDate periodStartDate;

    @Schema(
            description = "Last day of the menstrual period",
            example = "2026-07-05"
    )
    @NotNull(message = "Period end date is required")
    private LocalDate periodEndDate;

    @Schema(
            description = "Average menstrual cycle length in days",
            example = "28"
    )
    @NotNull(message = "Cycle length is required")
    private Integer cycleLength;

    @Schema(
            description = "Duration of the menstrual period in days",
            example = "5"
    )
    @NotNull(message = "Period length is required")
    private Integer periodLength;

    @Schema(
            description = "Menstrual flow intensity",
            example = "MEDIUM"
    )
    @NotNull(message = "Flow is required")
    private CycleFlow flow;
}

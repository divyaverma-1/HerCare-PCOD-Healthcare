package com.hercare.backend.dto.response;

import java.time.DayOfWeek;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing a doctor's availability schedule")
public class DoctorAvailabilityResponse {

    @Schema(description = "Availability record ID", example = "1")
    private Long id;

    @Schema(description = "Day of the week the doctor is available", example = "MONDAY")
    private DayOfWeek day;

    @Schema(description = "Availability start time", example = "09:00:00")
    private LocalTime startTime;

    @Schema(description = "Availability end time", example = "17:00:00")
    private LocalTime endTime;
}

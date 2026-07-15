package com.hercare.backend.dto.request;

import java.time.DayOfWeek;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request object for adding or updating doctor availability")
public class DoctorAvailabilityRequest {

    @Schema(
            description = "Day of the week when the doctor is available",
            example = "MONDAY"
    )
    private DayOfWeek day;

    @Schema(
            description = "Availability start time",
            example = "09:00:00"
    )
    private LocalTime startTime;

    @Schema(
            description = "Availability end time",
            example = "17:00:00"
    )
    private LocalTime endTime;
}

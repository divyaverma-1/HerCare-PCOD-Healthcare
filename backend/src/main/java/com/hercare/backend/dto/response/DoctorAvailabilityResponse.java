package com.hercare.backend.dto.response;

import java.time.DayOfWeek;
import java.time.LocalTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorAvailabilityResponse {

    private Long id;

    private DayOfWeek day;

    private LocalTime startTime;

    private LocalTime endTime;

}

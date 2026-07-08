package com.hercare.backend.dto.request;

import java.time.DayOfWeek;
import java.time.LocalTime;

import lombok.Data;

@Data
public class DoctorAvailabilityRequest {

    private DayOfWeek day;

    private LocalTime startTime;

    private LocalTime endTime;

}

package com.hercare.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.AppointmentStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AppointmentResponse {

    private Long id;

    private LocalDate appointmentDate;

    private LocalTime appointmentTime;

    private String reason;

    private AppointmentStatus status;

    private Long patientId;

    private String patientName;

    private Long doctorId;

    private String doctorName;

}

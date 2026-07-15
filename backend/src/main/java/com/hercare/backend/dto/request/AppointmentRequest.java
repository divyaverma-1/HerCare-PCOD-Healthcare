package com.hercare.backend.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Request object used by a patient to book an appointment")
public class AppointmentRequest {

    @Schema(
            description = "Unique ID of the doctor",
            example = "2"
    )
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;

    @Schema(
            description = "Preferred appointment date",
            example = "2026-07-20"
    )
    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date cannot be in the past")
    private LocalDate appointmentDate;

    @Schema(
            description = "Preferred appointment time",
            example = "10:30:00"
    )
    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    @Schema(
            description = "Reason for booking the appointment",
            example = "Irregular periods and pelvic pain."
    )
    private String reason;
}

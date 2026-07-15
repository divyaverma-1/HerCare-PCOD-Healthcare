package com.hercare.backend.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.AppointmentStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing appointment details")
public class AppointmentResponse {

    @Schema(description = "Appointment ID", example = "25")
    private Long id;

    @Schema(description = "Patient ID", example = "5")
    private Long patientId;

    @Schema(description = "Patient full name", example = "Divya Verma")
    private String patientName;

    @Schema(description = "Doctor ID", example = "2")
    private Long doctorId;

    @Schema(description = "Doctor full name", example = "Dr. Priya Sharma")
    private String doctorName;

    @Schema(description = "Appointment date", example = "2026-07-20")
    private LocalDate appointmentDate;

    @Schema(description = "Appointment time", example = "10:30:00")
    private LocalTime appointmentTime;

    @Schema(description = "Current appointment status", example = "APPROVED")
    private AppointmentStatus status;

    @Schema(description = "Reason for the appointment", example = "Irregular periods and pelvic pain.")
    private String reason;
}

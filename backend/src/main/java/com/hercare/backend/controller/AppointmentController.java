package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.AppointmentRequest;
import com.hercare.backend.dto.response.AppointmentResponse;
import com.hercare.backend.service.AppointmentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@Tag(name = "Appointments", description = "Appointment Management APIs")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(
            summary = "Book Appointment",
            description = "Patient books an appointment with a doctor."
    )
    @ApiResponse(responseCode = "200", description = "Appointment booked successfully")
    @ApiResponse(responseCode = "400", description = "Invalid appointment details")
    @PostMapping
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        return ResponseEntity.ok(
                appointmentService.bookAppointment(request));
    }

    @Operation(
            summary = "View My Appointments",
            description = "Returns appointments booked by the logged-in patient."
    )
    @ApiResponse(responseCode = "200", description = "Appointments fetched successfully")
    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments() {

        return ResponseEntity.ok(
                appointmentService.getMyAppointments());
    }

    @Operation(
            summary = "Doctor Appointments",
            description = "Returns appointments assigned to the logged-in doctor."
    )
    @ApiResponse(responseCode = "200", description = "Appointments fetched successfully")
    @GetMapping("/doctor")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointments() {

        return ResponseEntity.ok(
                appointmentService.getDoctorAppointments());
    }

    @Operation(
            summary = "Approve Appointment",
            description = "Doctor approves a pending appointment."
    )
    @ApiResponse(responseCode = "200", description = "Appointment approved")
    @PutMapping("/{id}/approve")
    public ResponseEntity<AppointmentResponse> approveAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.approveAppointment(id));
    }

    @Operation(
            summary = "Reject Appointment",
            description = "Doctor rejects a pending appointment."
    )
    @ApiResponse(responseCode = "200", description = "Appointment rejected")
    @PutMapping("/{id}/reject")
    public ResponseEntity<AppointmentResponse> rejectAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.rejectAppointment(id));
    }

    @Operation(
            summary = "Complete Appointment",
            description = "Doctor marks an appointment as completed."
    )
    @ApiResponse(responseCode = "200", description = "Appointment completed")
    @PutMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponse> completeAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(id));
    }

    @Operation(
            summary = "Cancel Appointment",
            description = "Patient cancels an appointment."
    )
    @ApiResponse(responseCode = "200", description = "Appointment cancelled")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancelAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.cancelAppointment(id));
    }
}

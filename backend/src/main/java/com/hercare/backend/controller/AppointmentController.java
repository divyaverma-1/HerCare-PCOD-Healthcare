package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hercare.backend.dto.request.AppointmentRequest;
import com.hercare.backend.dto.response.AppointmentResponse;
import com.hercare.backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // ================= PATIENT =================
    @PostMapping
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @RequestBody AppointmentRequest request) {

        return ResponseEntity.ok(
                appointmentService.bookAppointment(request));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments() {

        return ResponseEntity.ok(
                appointmentService.getMyAppointments());
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<String> cancelAppointment(
            @PathVariable Long id) {

        appointmentService.cancelAppointment(id);

        return ResponseEntity.ok("Appointment cancelled successfully.");
    }

    // ================= DOCTOR =================
    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointments() {

        return ResponseEntity.ok(
                appointmentService.getDoctorAppointments());
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<AppointmentResponse> approveAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.approveAppointment(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<AppointmentResponse> rejectAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.rejectAppointment(id));
    }

    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<AppointmentResponse> completeAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(id));
    }

}

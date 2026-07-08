package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> bookAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        return ResponseEntity.ok(
                appointmentService.bookAppointment(request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponse>> getMyAppointments() {

        return ResponseEntity.ok(
                appointmentService.getMyAppointments());
    }

    @GetMapping("/doctor")
    public ResponseEntity<List<AppointmentResponse>> getDoctorAppointments() {

        return ResponseEntity.ok(
                appointmentService.getDoctorAppointments());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<AppointmentResponse> approveAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.approveAppointment(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<AppointmentResponse> rejectAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.rejectAppointment(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponse> completeAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.completeAppointment(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancelAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.cancelAppointment(id));
    }
}

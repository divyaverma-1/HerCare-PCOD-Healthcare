package com.hercare.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.AppointmentRequest;
import com.hercare.backend.dto.response.AppointmentResponse;
import com.hercare.backend.entity.Appointment;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.AppointmentStatus;
import com.hercare.backend.repository.AppointmentRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Override
    public AppointmentResponse bookAppointment(AppointmentRequest request) {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User patient = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        User doctor = userRepository
                .findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        Appointment saved = appointmentRepository.save(appointment);

        return mapToResponse(saved);
    }

    @Override
    public List<AppointmentResponse> getMyAppointments() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User patient = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return appointmentRepository.findByPatient(patient)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getDoctorAppointments() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        User doctor = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return appointmentRepository.findByDoctor(doctor)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentResponse approveAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.APPROVED);

        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse rejectAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.REJECTED);

        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse completeAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.COMPLETED);

        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public void cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.CANCELLED);

        appointmentRepository.save(appointment);
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {

        return AppointmentResponse.builder()
                .id(appointment.getId())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTime(appointment.getAppointmentTime())
                .reason(appointment.getReason())
                .status(appointment.getStatus())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getFullName())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getFullName())
                .build();
    }

}

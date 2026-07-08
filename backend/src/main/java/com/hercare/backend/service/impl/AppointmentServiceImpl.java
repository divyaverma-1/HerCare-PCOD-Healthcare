package com.hercare.backend.service.impl;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.AppointmentRequest;
import com.hercare.backend.dto.response.AppointmentResponse;
import com.hercare.backend.entity.Appointment;
import com.hercare.backend.entity.DoctorAvailability;
import com.hercare.backend.entity.DoctorProfile;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.AppointmentStatus;
import com.hercare.backend.repository.AppointmentRepository;
import com.hercare.backend.repository.DoctorAvailabilityRepository;
import com.hercare.backend.repository.DoctorProfileRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final DoctorAvailabilityRepository doctorAvailabilityRepository;

    private User getLoggedInUser() {

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        return userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public AppointmentResponse bookAppointment(AppointmentRequest request) {

        User patient = getLoggedInUser();

        User doctor = userRepository
                .findById(request.getDoctorId())
                .orElseThrow(()
                        -> new RuntimeException("Doctor not found"));

        DoctorProfile doctorProfile = doctorProfileRepository
                .findByDoctor(doctor)
                .orElseThrow(()
                        -> new RuntimeException("Doctor profile not found"));

        if (!Boolean.TRUE.equals(doctorProfile.getActive())) {
            throw new RuntimeException("Doctor is inactive");
        }

        DayOfWeek appointmentDay
                = request.getAppointmentDate().getDayOfWeek();

        DoctorAvailability availability
                = doctorAvailabilityRepository
                        .findByDoctorProfileAndDay(
                                doctorProfile,
                                appointmentDay)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Doctor is unavailable on "
                                + appointmentDay));

        if (request.getAppointmentTime().isBefore(
                availability.getStartTime())
                || request.getAppointmentTime().isAfter(
                        availability.getEndTime())) {

            throw new RuntimeException(
                    "Selected time is outside doctor's availability");
        }

        boolean alreadyBooked
                = appointmentRepository
                        .existsByDoctorAndAppointmentDateAndAppointmentTime(
                                doctor,
                                request.getAppointmentDate(),
                                request.getAppointmentTime());

        if (alreadyBooked) {
            throw new RuntimeException(
                    "Appointment slot already booked");
        }

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(
                request.getAppointmentDate());

        appointment.setAppointmentTime(
                request.getAppointmentTime());

        appointment.setReason(
                request.getReason());

        appointment.setStatus(
                AppointmentStatus.PENDING);

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        Appointment saved
                = appointmentRepository.save(appointment);

        return mapToResponse(saved);
    }

    @Override
    public List<AppointmentResponse> getMyAppointments() {

        User patient = getLoggedInUser();

        return appointmentRepository
                .findByPatient(patient)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponse> getDoctorAppointments() {

        User doctor = getLoggedInUser();

        return appointmentRepository
                .findByDoctor(doctor)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentResponse approveAppointment(Long appointmentId) {

        Appointment appointment
                = appointmentRepository.findById(appointmentId)
                        .orElseThrow(()
                                -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.APPROVED);

        return mapToResponse(
                appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse rejectAppointment(Long appointmentId) {

        Appointment appointment
                = appointmentRepository.findById(appointmentId)
                        .orElseThrow(()
                                -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.REJECTED);

        return mapToResponse(
                appointmentRepository.save(appointment));
    }

    @Override
    public AppointmentResponse cancelAppointment(Long appointmentId) {

        Appointment appointment
                = appointmentRepository.findById(appointmentId)
                        .orElseThrow(()
                                -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.CANCELLED);

        return mapToResponse(
                appointmentRepository.save(appointment));
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

    @Override
    public AppointmentResponse completeAppointment(Long id) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.COMPLETED);

        return mapToResponse(
                appointmentRepository.save(appointment));
    }
}

package com.hercare.backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.Appointment;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.AppointmentStatus;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatient(User patient);

    List<Appointment> findByDoctor(User doctor);

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByDoctorIdAndStatus(
            Long doctorId,
            AppointmentStatus status);

    List<Appointment> findByPatientIdAndStatus(
            Long patientId,
            AppointmentStatus status);

    boolean existsByDoctorAndAppointmentDateAndAppointmentTime(
            User doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime);
}

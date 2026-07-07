package com.hercare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.Appointment;
import com.hercare.backend.entity.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatient(User patient);

    List<Appointment> findByDoctor(User doctor);

}

package com.hercare.backend.repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.DoctorAvailability;
import com.hercare.backend.entity.DoctorProfile;

public interface DoctorAvailabilityRepository
        extends JpaRepository<DoctorAvailability, Long> {

    List<DoctorAvailability> findByDoctorProfileId(
            Long doctorProfileId);

    Optional<DoctorAvailability>
            findByDoctorProfileAndDay(
                    DoctorProfile doctorProfile,
                    DayOfWeek day);

}

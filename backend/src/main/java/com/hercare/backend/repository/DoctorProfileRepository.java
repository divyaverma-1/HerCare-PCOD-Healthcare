package com.hercare.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.DoctorProfile;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.DoctorSpecialization;

public interface DoctorProfileRepository
        extends JpaRepository<DoctorProfile, Long> {

    Optional<DoctorProfile> findByDoctor(User doctor);

    Optional<DoctorProfile> findByDoctorId(Long doctorId);

    List<DoctorProfile> findBySpecialization(
            DoctorSpecialization specialization);

    List<DoctorProfile> findByDoctorFullNameContainingIgnoreCase(
            String name);

    List<DoctorProfile> findByActiveTrue();

    List<DoctorProfile> findByHospitalNameContainingIgnoreCase(String hospitalName);

    List<DoctorProfile> findByExperienceGreaterThanEqual(Integer experience);

    List<DoctorProfile> findByConsultationFeeLessThanEqual(Double fee);

    List<DoctorProfile> findBySpecializationAndActiveTrue(
            DoctorSpecialization specialization);

}

package com.hercare.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hercare.backend.entity.User;
import com.hercare.backend.enums.ApprovalStatus;
import com.hercare.backend.enums.Role;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    Optional<User> findByMedicalRegistrationNumber(String medicalRegistrationNumber);

    boolean existsByMedicalRegistrationNumber(String medicalRegistrationNumber);

    List<User> findByRoleAndApprovalStatus(
            Role role,
            ApprovalStatus approvalStatus);

    boolean existsByRole(Role role);

}

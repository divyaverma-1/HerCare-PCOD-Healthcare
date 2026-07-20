package com.hercare.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hercare.backend.dto.response.UserResponse;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.ApprovalStatus;
import com.hercare.backend.enums.Role;
import com.hercare.backend.exception.ResourceNotFoundException;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;

    @Override
    public List<UserResponse> getPendingDoctors() {

        List<User> doctors = userRepository.findByRoleAndApprovalStatus(
                Role.DOCTOR,
                ApprovalStatus.PENDING);

        return doctors.stream()
                .map(user -> UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .gender(
                        user.getGender() != null
                        ? user.getGender().name()
                        : "NOT_SPECIFIED"
                )
                .role(user.getRole().name())
                .active(user.getActive())
                // ===== New Doctor Verification Details =====
                .medicalRegistrationNumber(user.getMedicalRegistrationNumber())
                .medicalCouncil(user.getMedicalCouncil())
                .specialization(user.getSpecialization())
                .hospitalName(user.getHospitalName())
                .registrationVerified(user.getRegistrationVerified())
                .build())
                .collect(Collectors.toList());
    }

    @Override
    public void approveDoctor(Long doctorId) {

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new IllegalArgumentException("User is not a doctor");
        }

        doctor.setApprovalStatus(ApprovalStatus.APPROVED);
        doctor.setRegistrationVerified(true);

        userRepository.save(doctor);
    }

    @Override
    public void rejectDoctor(Long doctorId) {

        User doctor = userRepository.findById(doctorId)
                .orElseThrow(()
                        -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new IllegalArgumentException("User is not a doctor");
        }

        doctor.setApprovalStatus(ApprovalStatus.REJECTED);
        doctor.setRegistrationVerified(false);

        userRepository.save(doctor);
    }
}

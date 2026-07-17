package com.hercare.backend.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hercare.backend.enums.ApprovalStatus;
import com.hercare.backend.enums.DoctorSpecialization;
import com.hercare.backend.enums.Gender;
import com.hercare.backend.enums.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String profilePicture;

    /**
     * Doctor Verification Details (Used only when role = DOCTOR)
     */
    @Column(unique = true)
    private String medicalRegistrationNumber;

    private String medicalCouncil;

    @Builder.Default
    private Boolean registrationVerified = false;

    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CycleRecord> cycleRecords;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SymptomRecord> symptomRecords;

    @OneToMany(mappedBy = "user")
    private List<Medication> medications;

    @JsonIgnore
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Appointment> patientAppointments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Appointment> doctorAppointments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Prediction> predictions = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.APPROVED;

    @Enumerated(EnumType.STRING)
    private DoctorSpecialization specialization;

    private String hospitalName;
}

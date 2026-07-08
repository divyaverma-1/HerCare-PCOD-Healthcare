package com.hercare.backend.entity;

import com.hercare.backend.enums.DoctorSpecialization;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "doctor_profiles")
public class DoctorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false, unique = true)
    private User doctor;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private Integer experience;

    @Column(nullable = false)
    private Double consultationFee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DoctorSpecialization specialization;

    //@Column(nullable = false)
    //private ConsultationMode consultationMode;
    private String hospitalName;

    private String about;

    private Boolean active = true;

    @OneToMany(
            mappedBy = "doctorProfile",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<DoctorAvailability> availability;

}

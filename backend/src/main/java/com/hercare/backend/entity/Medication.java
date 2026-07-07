package com.hercare.backend.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.hercare.backend.enums.MedicationFrequency;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;

    private String dosage;

    private LocalDate startDate;

    private LocalDate endDate;

    private LocalTime reminderTime;

    @Enumerated(EnumType.STRING)
    private MedicationFrequency frequency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}

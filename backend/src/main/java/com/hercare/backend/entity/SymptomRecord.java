package com.hercare.backend.entity;

import java.time.LocalDate;

import com.hercare.backend.enums.Severity;
import com.hercare.backend.enums.SymptomType;

import jakarta.persistence.Column;
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
@Table(name = "symptom_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SymptomRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate recordedDate;

    @Enumerated(EnumType.STRING)
    private SymptomType symptom;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Column(length = 500)
    private String notes;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

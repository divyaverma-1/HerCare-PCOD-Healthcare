package com.hercare.backend.entity;

import java.time.LocalDateTime;

import com.hercare.backend.enums.RiskLevel;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;

    private Double height;

    private Double weight;

    private Double bmi;

    private Boolean irregularPeriods;

    private Boolean acne;

    private Boolean hairGrowth;

    private Boolean hairLoss;

    private Boolean weightGain;

    private Boolean familyHistory;

    private Integer exerciseDays;

    private Integer predictionScore;

    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    private String recommendation;

    private LocalDateTime predictionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}

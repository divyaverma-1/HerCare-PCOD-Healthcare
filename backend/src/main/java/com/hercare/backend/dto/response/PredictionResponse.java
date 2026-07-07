package com.hercare.backend.dto.response;

import java.time.LocalDateTime;

import com.hercare.backend.enums.RiskLevel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PredictionResponse {

    private Long id;

    private Double bmi;

    private Integer predictionScore;

    private RiskLevel riskLevel;

    private String recommendation;

    private LocalDateTime predictionDate;

}

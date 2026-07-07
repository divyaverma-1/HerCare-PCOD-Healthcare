package com.hercare.backend.dto.request;

import lombok.Data;

@Data
public class PredictionRequest {

    private Integer age;

    private Double height;

    private Double weight;

    private Boolean irregularPeriods;

    private Boolean acne;

    private Boolean hairGrowth;

    private Boolean hairLoss;

    private Boolean weightGain;

    private Boolean familyHistory;

    private Integer exerciseDays;

}

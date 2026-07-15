package com.hercare.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request object for predicting PCOD risk based on user health information")
public class PredictionRequest {

    @Schema(description = "Age of the user in years", example = "21")
    private Integer age;

    @Schema(description = "Height in centimeters", example = "160.0")
    private Double height;

    @Schema(description = "Weight in kilograms", example = "65.5")
    private Double weight;

    @Schema(description = "Whether the user experiences irregular menstrual periods", example = "true")
    private Boolean irregularPeriods;

    @Schema(description = "Whether the user has acne", example = "true")
    private Boolean acne;

    @Schema(description = "Whether the user has excessive hair growth (Hirsutism)", example = "false")
    private Boolean hairGrowth;

    @Schema(description = "Whether the user experiences hair loss", example = "true")
    private Boolean hairLoss;

    @Schema(description = "Whether the user has experienced unexplained weight gain", example = "true")
    private Boolean weightGain;

    @Schema(description = "Whether there is a family history of PCOD", example = "false")
    private Boolean familyHistory;

    @Schema(description = "Number of exercise days per week", example = "4")
    private Integer exerciseDays;
}

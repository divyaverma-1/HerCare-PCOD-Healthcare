package com.hercare.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Response containing a personalized health tip")
public class HealthTipResponse {

    @Schema(description = "Health tip category", example = "Nutrition")
    private String category;

    @Schema(description = "Title of the health tip", example = "Stay Hydrated")
    private String title;

    @Schema(
            description = "Detailed description of the health tip",
            example = "Drink at least 2-3 liters of water daily to support overall health and hormone balance."
    )
    private String description;
}

package com.hercare.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HealthTipResponse {

    private String category;

    private String title;

    private String description;

}

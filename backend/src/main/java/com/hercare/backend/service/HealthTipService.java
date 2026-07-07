package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.response.HealthTipResponse;

public interface HealthTipService {

    List<HealthTipResponse> getPersonalizedTips();

}

package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.PredictionRequest;
import com.hercare.backend.dto.response.PredictionResponse;

public interface PredictionService {

    PredictionResponse predict(PredictionRequest request);

    List<PredictionResponse> getPredictionHistory();

}

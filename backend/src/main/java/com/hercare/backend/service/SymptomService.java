package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.SymptomRequest;
import com.hercare.backend.dto.response.SymptomResponse;

public interface SymptomService {

    SymptomResponse addSymptom(SymptomRequest request);

    List<SymptomResponse> getMySymptoms();

}

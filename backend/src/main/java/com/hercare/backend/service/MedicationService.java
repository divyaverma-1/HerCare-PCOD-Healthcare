package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.MedicationRequest;
import com.hercare.backend.dto.response.MedicationResponse;

public interface MedicationService {

    MedicationResponse addMedication(MedicationRequest request);

    List<MedicationResponse> getMyMedications();

}

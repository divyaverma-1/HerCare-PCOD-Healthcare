package com.hercare.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.MedicationRequest;
import com.hercare.backend.dto.response.MedicationResponse;
import com.hercare.backend.entity.Medication;
import com.hercare.backend.entity.User;
import com.hercare.backend.repository.MedicationRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.MedicationService;

@Service
public class MedicationServiceImpl implements MedicationService {

    private final MedicationRepository medicationRepository;
    private final UserRepository userRepository;

    public MedicationServiceImpl(
            MedicationRepository medicationRepository,
            UserRepository userRepository) {

        this.medicationRepository = medicationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public MedicationResponse addMedication(MedicationRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Medication medication = Medication.builder()
                .medicineName(request.getMedicineName())
                .dosage(request.getDosage())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .reminderTime(request.getReminderTime())
                .frequency(request.getFrequency())
                .user(user)
                .build();

        medicationRepository.save(medication);

        return new MedicationResponse(
                medication.getId(),
                medication.getMedicineName(),
                medication.getDosage(),
                medication.getStartDate(),
                medication.getEndDate(),
                medication.getReminderTime(),
                medication.getFrequency()
        );
    }

    @Override
    public List<MedicationResponse> getMyMedications() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return medicationRepository.findByUser(user)
                .stream()
                .map(medication -> new MedicationResponse(
                medication.getId(),
                medication.getMedicineName(),
                medication.getDosage(),
                medication.getStartDate(),
                medication.getEndDate(),
                medication.getReminderTime(),
                medication.getFrequency()))
                .collect(Collectors.toList());
    }
}

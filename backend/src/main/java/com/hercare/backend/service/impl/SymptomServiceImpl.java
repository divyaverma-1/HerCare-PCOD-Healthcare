package com.hercare.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.SymptomRequest;
import com.hercare.backend.dto.response.SymptomResponse;
import com.hercare.backend.entity.SymptomRecord;
import com.hercare.backend.entity.User;
import com.hercare.backend.repository.SymptomRecordRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.SymptomService;

@Service
public class SymptomServiceImpl implements SymptomService {

    private final SymptomRecordRepository symptomRecordRepository;
    private final UserRepository userRepository;

    public SymptomServiceImpl(
            SymptomRecordRepository symptomRecordRepository,
            UserRepository userRepository) {

        this.symptomRecordRepository = symptomRecordRepository;
        this.userRepository = userRepository;
    }

    @Override
    public SymptomResponse addSymptom(SymptomRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SymptomRecord symptomRecord = SymptomRecord.builder()
                .recordedDate(request.getDate())
                .symptom(request.getSymptomType())
                .severity(request.getSeverity())
                .notes(request.getNotes())
                .user(user)
                .build();

        symptomRecordRepository.save(symptomRecord);

        return new SymptomResponse(
                symptomRecord.getId(),
                symptomRecord.getSymptom(),
                symptomRecord.getSeverity(),
                symptomRecord.getRecordedDate(),
                symptomRecord.getNotes());
    }

    @Override
    public List<SymptomResponse> getMySymptoms() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SymptomRecord> records = symptomRecordRepository.findByUser(user);

        return records.stream()
                .map(record -> new SymptomResponse(
                record.getId(),
                record.getSymptom(),
                record.getSeverity(),
                record.getRecordedDate(),
                record.getNotes()))
                .collect(Collectors.toList());
    }
}

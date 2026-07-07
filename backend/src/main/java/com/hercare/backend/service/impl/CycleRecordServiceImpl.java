package com.hercare.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.CycleRecordRequest;
import com.hercare.backend.dto.response.CycleRecordResponse;
import com.hercare.backend.entity.CycleRecord;
import com.hercare.backend.entity.User;
import com.hercare.backend.repository.CycleRecordRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.CycleRecordService;

@Service
public class CycleRecordServiceImpl implements CycleRecordService {

    private final CycleRecordRepository cycleRecordRepository;
    private final UserRepository userRepository;

    public CycleRecordServiceImpl(
            CycleRecordRepository cycleRecordRepository,
            UserRepository userRepository) {

        this.cycleRecordRepository = cycleRecordRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CycleRecordResponse saveCycleRecord(CycleRecordRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CycleRecord cycleRecord = CycleRecord.builder()
                .periodStartDate(request.getPeriodStartDate())
                .periodEndDate(request.getPeriodEndDate())
                .cycleLength(request.getCycleLength())
                .periodLength(request.getPeriodLength())
                .flow(request.getFlow())
                .user(user)
                .build();

        cycleRecordRepository.save(cycleRecord);

        return CycleRecordResponse.builder()
                .id(cycleRecord.getId())
                .periodStartDate(cycleRecord.getPeriodStartDate())
                .periodEndDate(cycleRecord.getPeriodEndDate())
                .cycleLength(cycleRecord.getCycleLength())
                .periodLength(cycleRecord.getPeriodLength())
                .flow(cycleRecord.getFlow())
                .build();
    }

    @Override
    public List<CycleRecordResponse> getMyCycleRecords() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CycleRecord> records = cycleRecordRepository.findByUser(user);

        return records.stream()
                .map(record -> CycleRecordResponse.builder()
                .id(record.getId())
                .periodStartDate(record.getPeriodStartDate())
                .periodEndDate(record.getPeriodEndDate())
                .cycleLength(record.getCycleLength())
                .periodLength(record.getPeriodLength())
                .flow(record.getFlow())
                .build())
                .collect(Collectors.toList());
    }
}

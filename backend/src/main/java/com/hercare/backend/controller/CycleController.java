package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.CycleRecordRequest;
import com.hercare.backend.dto.response.CycleRecordResponse;
import com.hercare.backend.service.CycleRecordService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cycle")
public class CycleController {

    private final CycleRecordService cycleRecordService;

    public CycleController(CycleRecordService cycleRecordService) {
        this.cycleRecordService = cycleRecordService;
    }

    @PostMapping
    public ResponseEntity<CycleRecordResponse> saveCycleRecord(
            @Valid @RequestBody CycleRecordRequest request) {

        CycleRecordResponse response =
                cycleRecordService.saveCycleRecord(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CycleRecordResponse>> getMyCycleRecords() {

        List<CycleRecordResponse> records =
                cycleRecordService.getMyCycleRecords();

        return ResponseEntity.ok(records);
    }
}
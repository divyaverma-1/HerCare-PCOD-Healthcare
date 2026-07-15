package com.hercare.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hercare.backend.dto.request.CycleRecordRequest;
import com.hercare.backend.dto.response.CycleRecordResponse;
import com.hercare.backend.service.CycleRecordService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cycle")
@Tag(name = "Cycle Tracking", description = "Menstrual Cycle Tracking APIs")
public class CycleController {

    private final CycleRecordService cycleRecordService;

    public CycleController(CycleRecordService cycleRecordService) {
        this.cycleRecordService = cycleRecordService;
    }

    @Operation(
            summary = "Add Cycle Record",
            description = "Adds a new menstrual cycle record for the logged-in user."
    )
    @ApiResponse(responseCode = "201", description = "Cycle record added successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @PostMapping
    public ResponseEntity<CycleRecordResponse> saveCycleRecord(
            @Valid @RequestBody CycleRecordRequest request) {

        CycleRecordResponse response
                = cycleRecordService.saveCycleRecord(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "View My Cycle Records",
            description = "Returns all menstrual cycle records of the logged-in user."
    )
    @ApiResponse(responseCode = "200", description = "Cycle records retrieved successfully")
    @GetMapping
    public ResponseEntity<List<CycleRecordResponse>> getMyCycleRecords() {

        List<CycleRecordResponse> records
                = cycleRecordService.getMyCycleRecords();

        return ResponseEntity.ok(records);
    }
}

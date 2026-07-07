package com.hercare.backend.dto.request;

import java.time.LocalDate;

import com.hercare.backend.enums.CycleFlow;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CycleRecordRequest {

    @NotNull
    private LocalDate periodStartDate;

    @NotNull
    private LocalDate periodEndDate;

    @NotNull
    private Integer cycleLength;

    @NotNull
    private Integer periodLength;

    @NotNull
    private CycleFlow flow;
}

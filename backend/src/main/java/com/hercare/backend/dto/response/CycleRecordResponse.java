package com.hercare.backend.dto.response;

import java.time.LocalDate;

import com.hercare.backend.enums.CycleFlow;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CycleRecordResponse {

    private Long id;

    private LocalDate periodStartDate;

    private LocalDate periodEndDate;

    private Integer cycleLength;

    private Integer periodLength;

    private CycleFlow flow;
}

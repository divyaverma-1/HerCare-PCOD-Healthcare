package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.CycleRecordRequest;
import com.hercare.backend.dto.response.CycleRecordResponse;

public interface CycleRecordService {

    CycleRecordResponse saveCycleRecord(CycleRecordRequest request);

    List<CycleRecordResponse> getMyCycleRecords();

}

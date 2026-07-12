package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.response.UserResponse;

public interface AdminService {

    List<UserResponse> getPendingDoctors();

    void approveDoctor(Long doctorId);

    void rejectDoctor(Long doctorId);
}

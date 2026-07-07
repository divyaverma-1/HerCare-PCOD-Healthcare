package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.LoginRequest;
import com.hercare.backend.dto.request.RegisterRequest;
import com.hercare.backend.dto.request.UpdateProfileRequest;
import com.hercare.backend.dto.response.LoginResponse;
import com.hercare.backend.dto.response.UserProfileResponse;
import com.hercare.backend.dto.response.UserResponse;

public interface UserService {

    void registerUser(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    LoginResponse loginUser(LoginRequest request);

    UserProfileResponse getMyProfile();

    UserProfileResponse updateMyProfile(UpdateProfileRequest request);

    List<UserResponse> getAllUsers();

    void deactivateUser(Long userId);

    void activateUser(Long userId);
}

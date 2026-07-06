package com.hercare.backend.service;

import com.hercare.backend.dto.request.RegisterRequest;

public interface UserService {

    void registerUser(RegisterRequest request);

}

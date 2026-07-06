package com.hercare.backend.service.impl;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.RegisterRequest;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.Role;
import com.hercare.backend.exception.EmailAlreadyExistsException;
import com.hercare.backend.exception.PhoneAlreadyExistsException;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerUser(RegisterRequest request) {

        Optional<User> existingUser
                = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered");
        }
        Optional<User> existingPhone
                = userRepository.findByPhoneNumber(request.getPhoneNumber());

        if (existingPhone.isPresent()) {
            throw new PhoneAlreadyExistsException("Phone Number already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .role(Role.PATIENT)
                .active(true)
                .build();

        userRepository.save(user);
    }
}

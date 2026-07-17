package com.hercare.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.LoginRequest;
import com.hercare.backend.dto.request.RegisterRequest;
import com.hercare.backend.dto.request.UpdateProfileRequest;
import com.hercare.backend.dto.response.LoginResponse;
import com.hercare.backend.dto.response.UserProfileResponse;
import com.hercare.backend.dto.response.UserResponse;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.ApprovalStatus;
import com.hercare.backend.enums.Role;
import com.hercare.backend.exception.DoctorPendingApprovalException;
import com.hercare.backend.exception.DoctorRejectedException;
import com.hercare.backend.exception.EmailAlreadyExistsException;
import com.hercare.backend.exception.PhoneAlreadyExistsException;
import com.hercare.backend.exception.ResourceNotFoundException;
import com.hercare.backend.jwt.JwtService;
import com.hercare.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void registerUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            throw new PhoneAlreadyExistsException("Phone Number already registered");
        }

        // Doctor-specific validations
        if (request.getRole() == Role.DOCTOR) {

            if (request.getMedicalRegistrationNumber() == null
                    || request.getMedicalRegistrationNumber().isBlank()) {
                throw new IllegalArgumentException(
                        "Medical Registration Number is required.");
            }

            if (request.getMedicalCouncil() == null
                    || request.getMedicalCouncil().isBlank()) {
                throw new IllegalArgumentException(
                        "Medical Council is required.");
            }

            if (request.getSpecialization() == null) {
                throw new IllegalArgumentException(
                        "Specialization is required.");
            }

            if (request.getHospitalName() == null
                    || request.getHospitalName().isBlank()) {
                throw new IllegalArgumentException(
                        "Hospital Name is required.");
            }

            if (userRepository.existsByMedicalRegistrationNumber(
                    request.getMedicalRegistrationNumber())) {
                throw new IllegalArgumentException(
                        "Medical Registration Number already exists.");
            }
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .role(request.getRole())
                .medicalRegistrationNumber(request.getMedicalRegistrationNumber())
                .medicalCouncil(request.getMedicalCouncil())
                .specialization(request.getSpecialization())
                .hospitalName(request.getHospitalName())
                .registrationVerified(false)
                .active(true)
                .build();

        if (user.getRole() == Role.DOCTOR) {
            user.setApprovalStatus(ApprovalStatus.PENDING);
        } else {
            user.setApprovalStatus(ApprovalStatus.APPROVED);
            user.setRegistrationVerified(true);
        }

        userRepository.save(user);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        return loginUser(request);
    }

    @Override
    public LoginResponse loginUser(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getRole() == Role.DOCTOR) {

            if (user.getApprovalStatus() == ApprovalStatus.PENDING) {
                throw new DoctorPendingApprovalException(
                        "Doctor account is pending admin approval.");
            }

            if (user.getApprovalStatus() == ApprovalStatus.REJECTED) {
                throw new DoctorRejectedException(
                        "Doctor account has been rejected by admin.");
            }
        }
        System.out.println("========== LOGIN ==========");
        System.out.println("Email : " + user.getEmail());
        System.out.println("Role : " + user.getRole());
        System.out.println("Approval : " + user.getApprovalStatus());
        System.out.println("===========================");

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .message("Login Successful")
                .build();
    }

    @Override
    public UserProfileResponse getMyProfile() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public UserProfileResponse updateMyProfile(UpdateProfileRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setGender(request.getGender());

        userRepository.save(user);

        return UserProfileResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .role(user.getRole().name())
                .build();
    }

    @Override
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender().name())
                .role(user.getRole().name())
                .active(user.getActive())
                .build())
                .collect(Collectors.toList());
    }

    @Override
    public void deactivateUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setActive(false);

        userRepository.save(user);
    }

    @Override
    public void activateUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(true);

        userRepository.save(user);
    }
}

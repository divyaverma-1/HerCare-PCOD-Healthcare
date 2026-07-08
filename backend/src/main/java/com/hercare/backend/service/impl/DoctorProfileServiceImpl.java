package com.hercare.backend.service.impl;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.hercare.backend.dto.request.DoctorAvailabilityRequest;
import com.hercare.backend.dto.request.DoctorProfileRequest;
import com.hercare.backend.dto.response.DoctorAvailabilityResponse;
import com.hercare.backend.dto.response.DoctorProfileResponse;
import com.hercare.backend.entity.DoctorAvailability;
import com.hercare.backend.entity.DoctorProfile;
import com.hercare.backend.entity.User;
import com.hercare.backend.enums.DoctorSpecialization;
import com.hercare.backend.repository.DoctorAvailabilityRepository;
import com.hercare.backend.repository.DoctorProfileRepository;
import com.hercare.backend.repository.UserRepository;
import com.hercare.backend.service.DoctorProfileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorProfileServiceImpl implements DoctorProfileService {

    private final DoctorProfileRepository doctorProfileRepository;

    private final DoctorAvailabilityRepository availabilityRepository;

    private final UserRepository userRepository;

    private User getLoggedInUser() {

        Authentication authentication
                = SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();
    }

    @Override
    public DoctorProfileResponse createProfile(
            DoctorProfileRequest request) {

        User doctor = getLoggedInUser();

        DoctorProfile profile = DoctorProfile.builder()
                .doctor(doctor)
                .qualification(request.getQualification())
                .experience(request.getExperience())
                .consultationFee(request.getConsultationFee())
                .specialization(request.getSpecialization())
                .hospitalName(request.getHospitalName())
                .about(request.getAbout())
                .active(true)
                .build();

        return mapProfile(
                doctorProfileRepository.save(profile));
    }

    @Override
    public DoctorProfileResponse updateProfile(
            DoctorProfileRequest request) {

        User doctor = getLoggedInUser();

        DoctorProfile profile
                = doctorProfileRepository
                        .findByDoctorId(doctor.getId())
                        .orElseThrow();

        profile.setQualification(request.getQualification());
        profile.setExperience(request.getExperience());
        profile.setSpecialization(request.getSpecialization());
        profile.setHospitalName(request.getHospitalName());
        profile.setAbout(request.getAbout());
        profile.setConsultationFee(
                request.getConsultationFee());
        //profile.setConsultationMode(
        //  request.getConsultationMode());
        return mapProfile(
                doctorProfileRepository.save(profile));
    }

    @Override
    public DoctorProfileResponse getMyProfile() {

        User doctor = getLoggedInUser();

        return mapProfile(
                doctorProfileRepository
                        .findByDoctorId(doctor.getId())
                        .orElseThrow());

    }

    @Override
    public DoctorProfileResponse getDoctorById(Long id) {

        return mapProfile(
                doctorProfileRepository
                        .findById(id)
                        .orElseThrow());

    }

    @Override
    public List<DoctorProfileResponse> getAllDoctors() {

        return doctorProfileRepository
                .findByActiveTrue()
                .stream()
                .map(this::mapProfile)
                .toList();

    }

    @Override
    public List<DoctorProfileResponse> searchDoctors(
            String name) {

        return doctorProfileRepository
                .findByDoctorFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapProfile)
                .toList();

    }

    @Override
    public List<DoctorProfileResponse> getBySpecialization(
            DoctorSpecialization specialization) {

        return doctorProfileRepository
                .findBySpecialization(specialization)
                .stream()
                .map(this::mapProfile)
                .toList();

    }

    @Override
    public List<DoctorProfileResponse> searchByHospital(
            String hospitalName) {

        return doctorProfileRepository
                .findByHospitalNameContainingIgnoreCase(hospitalName)
                .stream()
                .map(this::mapProfile)
                .toList();
    }

    @Override
    public List<DoctorProfileResponse> searchByExperience(
            Integer experience) {

        return doctorProfileRepository
                .findByExperienceGreaterThanEqual(experience)
                .stream()
                .map(this::mapProfile)
                .toList();
    }

    @Override
    public List<DoctorProfileResponse> searchByConsultationFee(
            Double fee) {

        return doctorProfileRepository
                .findByConsultationFeeLessThanEqual(fee)
                .stream()
                .map(this::mapProfile)
                .toList();
    }

    @Override
    public DoctorAvailabilityResponse addAvailability(
            DoctorAvailabilityRequest request) {

        User doctor = getLoggedInUser();

        DoctorProfile profile
                = doctorProfileRepository
                        .findByDoctorId(doctor.getId())
                        .orElseThrow();

        DoctorAvailability availability
                = DoctorAvailability.builder()
                        .doctorProfile(profile)
                        .day(request.getDay())
                        .startTime(request.getStartTime())
                        .endTime(request.getEndTime())
                        .build();

        return mapAvailability(
                availabilityRepository.save(availability));

    }

    @Override
    public DoctorAvailabilityResponse updateAvailability(
            Long id,
            DoctorAvailabilityRequest request) {

        DoctorAvailability availability
                = availabilityRepository
                        .findById(id)
                        .orElseThrow();

        availability.setDay(request.getDay());
        availability.setStartTime(request.getStartTime());
        availability.setEndTime(request.getEndTime());

        return mapAvailability(
                availabilityRepository.save(availability));

    }

    @Override
    public List<DoctorAvailabilityResponse> getMyAvailability() {

        User doctor = getLoggedInUser();

        DoctorProfile profile
                = doctorProfileRepository
                        .findByDoctorId(doctor.getId())
                        .orElseThrow();

        return availabilityRepository
                .findByDoctorProfileId(profile.getId())
                .stream()
                .map(this::mapAvailability)
                .toList();

    }

    private DoctorProfileResponse mapProfile(
            DoctorProfile profile) {

        User doctor = profile.getDoctor();

        return DoctorProfileResponse.builder()
                .id(profile.getId())
                .doctorId(doctor.getId())
                .doctorName(doctor.getFullName())
                .email(doctor.getEmail())
                .phoneNumber(doctor.getPhoneNumber())
                .qualification(profile.getQualification())
                .experience(profile.getExperience())
                .specialization(profile.getSpecialization())
                .hospitalName(profile.getHospitalName())
                .about(profile.getAbout())
                .active(profile.getActive())
                .consultationFee(profile.getConsultationFee())
                .build();

    }

    private DoctorAvailabilityResponse mapAvailability(
            DoctorAvailability availability) {

        return DoctorAvailabilityResponse.builder()
                .id(availability.getId())
                .day(availability.getDay())
                .startTime(availability.getStartTime())
                .endTime(availability.getEndTime())
                .build();

    }

    @Override
    public List<DoctorProfileResponse> getAllDoctorProfiles() {

        return getAllDoctors();

    }

}

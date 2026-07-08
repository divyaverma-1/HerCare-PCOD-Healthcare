package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.DoctorAvailabilityRequest;
import com.hercare.backend.dto.request.DoctorProfileRequest;
import com.hercare.backend.dto.response.DoctorAvailabilityResponse;
import com.hercare.backend.dto.response.DoctorProfileResponse;
import com.hercare.backend.enums.DoctorSpecialization;

public interface DoctorProfileService {

    DoctorProfileResponse createProfile(
            DoctorProfileRequest request);

    DoctorProfileResponse updateProfile(
            DoctorProfileRequest request);

    DoctorProfileResponse getMyProfile();

    DoctorProfileResponse getDoctorById(
            Long id);

    List<DoctorProfileResponse> getAllDoctors();

    // Admin compatibility method
    List<DoctorProfileResponse> getAllDoctorProfiles();

    List<DoctorProfileResponse> searchDoctors(
            String name);

    List<DoctorProfileResponse> getBySpecialization(
            DoctorSpecialization specialization);

    DoctorAvailabilityResponse addAvailability(
            DoctorAvailabilityRequest request);

    DoctorAvailabilityResponse updateAvailability(
            Long id,
            DoctorAvailabilityRequest request);

    List<DoctorAvailabilityResponse> getMyAvailability();

    List<DoctorProfileResponse> searchByHospital(
            String hospitalName);

    List<DoctorProfileResponse> searchByExperience(
            Integer experience);

    List<DoctorProfileResponse> searchByConsultationFee(
            Double fee);

}

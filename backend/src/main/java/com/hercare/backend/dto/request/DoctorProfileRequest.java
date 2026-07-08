package com.hercare.backend.dto.request;

import com.hercare.backend.enums.DoctorSpecialization;

import lombok.Data;

@Data
public class DoctorProfileRequest {

    private String qualification;

    private Integer experience;

    private DoctorSpecialization specialization;

    private String hospitalName;

    private String about;

    private Double consultationFee;

    //private ConsultationMode consultationMode;
}

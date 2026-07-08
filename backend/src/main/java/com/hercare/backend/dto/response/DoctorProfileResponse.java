package com.hercare.backend.dto.response;

import com.hercare.backend.enums.DoctorSpecialization;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorProfileResponse {

    private Long id;

    private Long doctorId;

    private String doctorName;

    private String email;

    private String phoneNumber;

    private String qualification;

    private Integer experience;

    private DoctorSpecialization specialization;

    private String hospitalName;

    private String about;

    private Boolean active;

    private Double consultationFee;

}

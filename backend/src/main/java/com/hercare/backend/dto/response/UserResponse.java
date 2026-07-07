package com.hercare.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {

    private Long id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private String gender;

    private String role;

    private Boolean active;
}

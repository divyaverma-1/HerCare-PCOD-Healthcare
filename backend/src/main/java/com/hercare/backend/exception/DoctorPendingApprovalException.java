package com.hercare.backend.exception;

public class DoctorPendingApprovalException extends RuntimeException {

    public DoctorPendingApprovalException(String message) {
        super(message);
    }
}

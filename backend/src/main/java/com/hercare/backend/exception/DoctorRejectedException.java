package com.hercare.backend.exception;

public class DoctorRejectedException extends RuntimeException {

    public DoctorRejectedException(String message) {
        super(message);
    }
}

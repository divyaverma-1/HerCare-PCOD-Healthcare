package com.hercare.backend.service;

import java.util.List;

import com.hercare.backend.dto.request.AppointmentRequest;
import com.hercare.backend.dto.response.AppointmentResponse;

public interface AppointmentService {

    AppointmentResponse bookAppointment(AppointmentRequest request);

    List<AppointmentResponse> getMyAppointments();

    List<AppointmentResponse> getDoctorAppointments();

    AppointmentResponse approveAppointment(Long appointmentId);

    AppointmentResponse rejectAppointment(Long appointmentId);

    AppointmentResponse completeAppointment(Long appointmentId);

    void cancelAppointment(Long appointmentId);

}

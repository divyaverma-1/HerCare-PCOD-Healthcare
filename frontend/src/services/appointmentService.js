import axiosClient from '../api/axiosClient'

const appointmentService = {
  bookAppointment: (payload) => axiosClient.post('/appointments', payload),
  getMyAppointments: () => axiosClient.get('/appointments/my'),
  getDoctorAppointments: () => axiosClient.get('/appointments/doctor'),
  approveAppointment: (id) => axiosClient.put(`/appointments/${id}/approve`),
  rejectAppointment: (id) => axiosClient.put(`/appointments/${id}/reject`),
  completeAppointment: (id) => axiosClient.put(`/appointments/${id}/complete`),
  cancelAppointment: (id) => axiosClient.put(`/appointments/${id}/cancel`),
}

export default appointmentService

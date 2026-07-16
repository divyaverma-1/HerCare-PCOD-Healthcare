import axiosClient from '../api/axiosClient'

const doctorService = {
  // Public / patient-facing directory
  getAllDoctors: () => axiosClient.get('/doctors'),
  getDoctorById: (id) => axiosClient.get(`/doctors/${id}`),
  searchDoctors: (keyword) => axiosClient.get('/doctors/search', { params: { keyword } }),
  getBySpecialization: (specialization) =>
    axiosClient.get(`/doctors/specialization/${specialization}`),

  // Doctor's own profile management
  createMyProfile: (payload) => axiosClient.post('/doctors/profile', payload),
  updateMyProfile: (payload) => axiosClient.put('/doctors/profile', payload),
  getMyProfile: () => axiosClient.get('/doctors/profile'),

  // Doctor availability
  addAvailability: (payload) => axiosClient.post('/doctors/availability', payload),
  updateAvailability: (id, payload) => axiosClient.put(`/doctors/availability/${id}`, payload),
  getMyAvailability: () => axiosClient.get('/doctors/availability'),
}

export default doctorService

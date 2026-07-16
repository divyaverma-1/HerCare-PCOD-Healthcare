import axiosClient from '../api/axiosClient'

const adminService = {
  getAllUsers: () => axiosClient.get('/admin/users'),
  deactivateUser: (id) => axiosClient.put(`/admin/users/${id}/deactivate`),
  activateUser: (id) => axiosClient.put(`/admin/users/${id}/activate`),
  getAllDoctors: () => axiosClient.get('/admin/doctors'),
  getPendingDoctors: () => axiosClient.get('/admin/pending-doctors'),
  approveDoctor: (doctorId) => axiosClient.put(`/admin/doctors/${doctorId}/approve`),
  rejectDoctor: (doctorId) => axiosClient.put(`/admin/doctors/${doctorId}/reject`),
}

export default adminService

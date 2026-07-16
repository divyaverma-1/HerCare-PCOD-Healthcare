import axiosClient from '../api/axiosClient'

const authService = {
  register: (payload) => axiosClient.post('/auth/register', payload),
  login: (payload) => axiosClient.post('/auth/login', payload),
}

export default authService

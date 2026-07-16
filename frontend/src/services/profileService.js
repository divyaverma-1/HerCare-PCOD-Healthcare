import axiosClient from '../api/axiosClient'

const profileService = {
  getMyProfile: () => axiosClient.get('/profile'),
  updateMyProfile: (payload) => axiosClient.put('/profile', payload),
}

export default profileService

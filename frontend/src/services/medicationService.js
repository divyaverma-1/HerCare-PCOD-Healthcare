import axiosClient from '../api/axiosClient'

const medicationService = {
  addMedication: (payload) => axiosClient.post('/medications', payload),
  getMyMedications: () => axiosClient.get('/medications'),
}

export default medicationService

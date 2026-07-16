import axiosClient from '../api/axiosClient'

const symptomService = {
  addSymptom: (payload) => axiosClient.post('/symptoms', payload),
  getMySymptoms: () => axiosClient.get('/symptoms'),
}

export default symptomService

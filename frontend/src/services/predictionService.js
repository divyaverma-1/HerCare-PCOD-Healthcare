import axiosClient from '../api/axiosClient'

const predictionService = {
  predict: (payload) => axiosClient.post('/predictions', payload),
  getPredictionHistory: () => axiosClient.get('/predictions'),
}

export default predictionService

import axiosClient from '../api/axiosClient'

const cycleService = {
  saveCycleRecord: (payload) => axiosClient.post('/cycle', payload),
  getMyCycleRecords: () => axiosClient.get('/cycle'),
}

export default cycleService

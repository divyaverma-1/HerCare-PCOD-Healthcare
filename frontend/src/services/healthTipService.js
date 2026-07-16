import axiosClient from '../api/axiosClient'

const healthTipService = {
  getHealthTips: () => axiosClient.get('/health-tips'),
}

export default healthTipService

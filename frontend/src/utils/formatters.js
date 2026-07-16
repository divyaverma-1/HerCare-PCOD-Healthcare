import dayjs from 'dayjs'

export const formatDate = (date) => (date ? dayjs(date).format('DD MMM YYYY') : '—')

export const formatDateTime = (date) =>
  date ? dayjs(date).format('DD MMM YYYY, hh:mm A') : '—'

export const formatTime = (time) => {
  if (!time) return '—'
  // handles "HH:mm:ss" strings from backend LocalTime
  const parsed = dayjs(`2000-01-01T${time}`)
  return parsed.isValid() ? parsed.format('hh:mm A') : time
}

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '—'
  return `₹${Number(value).toFixed(0)}`
}

export const calculateBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null
  const heightM = heightCm / 100
  return +(weightKg / (heightM * heightM)).toFixed(1)
}

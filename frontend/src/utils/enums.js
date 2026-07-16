// Mirrors backend enums in com.hercare.backend.enums

export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
}

export const GENDER_OPTIONS = [
  { value: 'FEMALE', label: 'Female' },
  { value: 'MALE', label: 'Male' },
]

export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const APPOINTMENT_STATUS_COLOR = {
  PENDING: 'warning',
  APPROVED: 'info',
  REJECTED: 'error',
  COMPLETED: 'success',
  CANCELLED: 'default',
}

export const CYCLE_FLOW_OPTIONS = [
  { value: 'LIGHT', label: 'Light' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HEAVY', label: 'Heavy' },
]

export const DOCTOR_SPECIALIZATION_OPTIONS = [
  { value: 'GYNECOLOGIST', label: 'Gynecologist' },
  { value: 'ENDOCRINOLOGIST', label: 'Endocrinologist' },
  { value: 'NUTRITIONIST', label: 'Nutritionist' },
  { value: 'GENERAL_PHYSICIAN', label: 'General Physician' },
  { value: 'DERMATOLOGIST', label: 'Dermatologist' },
  { value: 'PSYCHOLOGIST', label: 'Psychologist' },
]

export const MEDICATION_FREQUENCY_OPTIONS = [
  { value: 'DAILY', label: 'Daily' },
  { value: 'TWICE_DAILY', label: 'Twice Daily' },
  { value: 'THRICE_DAILY', label: 'Thrice Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
]

export const RISK_LEVEL_COLOR = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
}

export const SEVERITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
]

export const SEVERITY_COLOR = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
}

export const SYMPTOM_TYPE_OPTIONS = [
  { value: 'ACNE', label: 'Acne' },
  { value: 'HAIR_FALL', label: 'Hair Fall' },
  { value: 'WEIGHT_GAIN', label: 'Weight Gain' },
  { value: 'MOOD_SWINGS', label: 'Mood Swings' },
  { value: 'IRREGULAR_PERIODS', label: 'Irregular Periods' },
  { value: 'PELVIC_PAIN', label: 'Pelvic Pain' },
  { value: 'FATIGUE', label: 'Fatigue' },
  { value: 'BLOATING', label: 'Bloating' },
  { value: 'HEADACHE', label: 'Headache' },
  { value: 'CRAMPS', label: 'Cramps' },
  { value: 'BACK_PAIN', label: 'Back Pain' },
  { value: 'BREAST_TENDERNESS', label: 'Breast Tenderness' },
  { value: 'NAUSEA', label: 'Nausea' },
]

export const DAY_OF_WEEK_OPTIONS = [
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  { value: 'WEDNESDAY', label: 'Wednesday' },
  { value: 'THURSDAY', label: 'Thursday' },
  { value: 'FRIDAY', label: 'Friday' },
  { value: 'SATURDAY', label: 'Saturday' },
  { value: 'SUNDAY', label: 'Sunday' },
]

export const labelFromValue = (options, value) =>
  options.find((o) => o.value === value)?.label || value

export const humanize = (value) => {
  if (!value) return ''
  return value
    .toString()
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

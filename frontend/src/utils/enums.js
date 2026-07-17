// ==============================
// Roles
// ==============================
export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
}
export const APPOINTMENT_STATUS = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];
// ==============================
// Gender
// ==============================
export const GENDER_OPTIONS = [
  {
    value: 'FEMALE',
    label: 'Female',
  },
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'OTHER',
    label: 'Other',
  },
]

// ==============================
// Doctor Specializations
// (Must exactly match backend enum)
// ==============================
export const DOCTOR_SPECIALIZATIONS = [
  {
    value: 'GYNECOLOGIST',
    label: 'Gynecologist',
  },
  {
    value: 'ENDOCRINOLOGIST',
    label: 'Endocrinologist',
  },
  {
    value: 'NUTRITIONIST',
    label: 'Nutritionist',
  },
  {
    value: 'GENERAL_PHYSICIAN',
    label: 'General Physician',
  },
  {
    value: 'DERMATOLOGIST',
    label: 'Dermatologist',
  },
  {
    value: 'PSYCHOLOGIST',
    label: 'Psychologist',
  },
  {
    value: 'FERTILITY_SPECIALIST',
    label: 'Fertility Specialist',
  },
]
export const DOCTOR_SPECIALIZATION_OPTIONS = DOCTOR_SPECIALIZATIONS
// ==============================
// Medical Councils
// ==============================
export const MEDICAL_COUNCILS = [
  {
    value: 'NMC',
    label: 'National Medical Commission (NMC)',
  },
  {
    value: 'MCI',
    label: 'Medical Council of India (MCI)',
  },
  {
    value: 'STATE_MEDICAL_COUNCIL',
    label: 'State Medical Council',
  },
  {
    value: 'OTHER',
    label: 'Other',
  },

  
]
export function humanize(value) {
  if (!value) return ''

  return value
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
// ==============================
// Appointment Status Colors
// ==============================

export const APPOINTMENT_STATUS_COLOR = {
  PENDING: {
    background: "#FFF3CD",
    color: "#856404",
  },

  APPROVED: {
    background: "#D4EDDA",
    color: "#155724",
  },

  REJECTED: {
    background: "#F8D7DA",
    color: "#721C24",
  },

  COMPLETED: {
    background: "#D1ECF1",
    color: "#0C5460",
  },

  CANCELLED: {
    background: "#E2E3E5",
    color: "#383D41",
  },
};

// ==============================
// PCOD Risk Level Colors
// ==============================

export const RISK_LEVEL_COLOR = {
  LOW: {
    background: "#D4EDDA",
    color: "#155724",
  },

  MODERATE: {
    background: "#FFF3CD",
    color: "#856404",
  },

  HIGH: {
    background: "#F8D7DA",
    color: "#721C24",
  },

  CRITICAL: {
    background: "#F5C6CB",
    color: "#721C24",
  },
};

// ==============================
// Menstrual Cycle Flow Options
// ==============================

export const CYCLE_FLOW_OPTIONS = [
  {
    value: "LIGHT",
    label: "Light",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HEAVY",
    label: "Heavy",
  },
  {
    value: "VERY_HEAVY",
    label: "Very Heavy",
  },
]

// ==============================
// Symptom Severity Colors
// ==============================

export const SEVERITY_COLOR = {
  LOW: {
    background: "#D4EDDA",
    color: "#155724",
  },

  MEDIUM: {
    background: "#FFF3CD",
    color: "#856404",
  },

  HIGH: {
    background: "#F8D7DA",
    color: "#721C24",
  },

  SEVERE: {
    background: "#F5C6CB",
    color: "#721C24",
  },
};

// ==============================
// Symptom Severity Options
// ==============================

export const SEVERITY_OPTIONS = [
  {
    value: "LOW",
    label: "Low",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HIGH",
    label: "High",
  },
  {
    value: "SEVERE",
    label: "Severe",
  },
]

// ==============================
// Symptom Types
// ==============================

export const SYMPTOM_TYPE_OPTIONS = [
  {
    value: "IRREGULAR_PERIODS",
    label: "Irregular Periods",
  },
  {
    value: "PELVIC_PAIN",
    label: "Pelvic Pain",
  },
  {
    value: "ACNE",
    label: "Acne",
  },
  {
    value: "HAIR_LOSS",
    label: "Hair Loss",
  },
  {
    value: "EXCESS_HAIR_GROWTH",
    label: "Excess Hair Growth",
  },
  {
    value: "WEIGHT_GAIN",
    label: "Weight Gain",
  },
  {
    value: "MOOD_SWINGS",
    label: "Mood Swings",
  },
  {
    value: "FATIGUE",
    label: "Fatigue",
  },
]

// ==============================
// Medication Frequency Options
// ==============================

export const MEDICATION_FREQUENCY_OPTIONS = [
  {
    value: 'DAILY',
    label: 'Daily',
  },
  {
    value: 'TWICE_DAILY',
    label: 'Twice Daily',
  },
  {
    value: 'THRICE_DAILY',
    label: 'Thrice Daily',
  },
  {
    value: 'WEEKLY',
    label: 'Weekly',
  },
  {
    value: 'MONTHLY',
    label: 'Monthly',
  },
]

// ==============================
// Days of Week
// ==============================

export const DAY_OF_WEEK_OPTIONS = [
  {
    value: 'MONDAY',
    label: 'Monday',
  },
  {
    value: 'TUESDAY',
    label: 'Tuesday',
  },
  {
    value: 'WEDNESDAY',
    label: 'Wednesday',
  },
  {
    value: 'THURSDAY',
    label: 'Thursday',
  },
  {
    value: 'FRIDAY',
    label: 'Friday',
  },
  {
    value: 'SATURDAY',
    label: 'Saturday',
  },
  {
    value: 'SUNDAY',
    label: 'Sunday',
  },
]
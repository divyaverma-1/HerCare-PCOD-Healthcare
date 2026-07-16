import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import HealingRoundedIcon from '@mui/icons-material/HealingRounded'
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'

export const patientNav = [
  { label: 'Dashboard', path: '/patient/dashboard', icon: DashboardRoundedIcon },
  { label: 'Cycle Tracker', path: '/patient/cycle-tracker', icon: CalendarMonthRoundedIcon },
  { label: 'Symptom Tracker', path: '/patient/symptom-tracker', icon: HealingRoundedIcon },
  { label: 'Medications', path: '/patient/medications', icon: MedicationRoundedIcon },
  { label: 'Find Doctors', path: '/patient/doctors', icon: SearchRoundedIcon },
  { label: 'Appointments', path: '/patient/appointments', icon: EventAvailableRoundedIcon },
  { label: 'PCOD Risk Check', path: '/patient/predictions', icon: InsightsRoundedIcon },
  { label: 'Health Tips', path: '/patient/health-tips', icon: TipsAndUpdatesRoundedIcon },
  { label: 'Profile', path: '/patient/profile', icon: PersonRoundedIcon },
]

export const doctorNav = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: DashboardRoundedIcon },
  { label: 'Appointments', path: '/doctor/appointments', icon: EventNoteRoundedIcon },
  { label: 'Availability', path: '/doctor/availability', icon: ScheduleRoundedIcon },
  { label: 'My Profile', path: '/doctor/profile', icon: BadgeRoundedIcon },
]

export const adminNav = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: DashboardRoundedIcon },
  { label: 'Users', path: '/admin/users', icon: GroupRoundedIcon },
  { label: 'Pending Doctors', path: '/admin/pending-doctors', icon: HowToRegRoundedIcon },
]

export const navByRole = {
  PATIENT: patientNav,
  DOCTOR: doctorNav,
  ADMIN: adminNav,
}

export const HistoryIcon = HistoryRoundedIcon

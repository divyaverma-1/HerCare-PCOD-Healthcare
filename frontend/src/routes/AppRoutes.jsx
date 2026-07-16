import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import RoleRoute from './RoleRoute.jsx'
import { ROLES } from '../utils/enums.js'

import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import NotFound from '../pages/NotFound.jsx'
import Unauthorized from '../pages/Unauthorized.jsx'

import PatientDashboard from '../pages/patient/Dashboard.jsx'
import PatientProfile from '../pages/patient/Profile.jsx'
import CycleTracker from '../pages/patient/CycleTracker.jsx'
import SymptomTracker from '../pages/patient/SymptomTracker.jsx'
import MedicationReminder from '../pages/patient/MedicationReminder.jsx'
import DoctorSearch from '../pages/patient/DoctorSearch.jsx'
import DoctorDetails from '../pages/patient/DoctorDetails.jsx'
import AppointmentBooking from '../pages/patient/AppointmentBooking.jsx'
import AppointmentHistory from '../pages/patient/AppointmentHistory.jsx'
import PredictionCenter from '../pages/patient/PredictionCenter.jsx'
import HealthTips from '../pages/patient/HealthTips.jsx'

import DoctorDashboard from '../pages/doctor/Dashboard.jsx'
import DoctorProfile from '../pages/doctor/DoctorProfile.jsx'
import DoctorAvailability from '../pages/doctor/Availability.jsx'
import DoctorAppointments from '../pages/doctor/Appointments.jsx'

import AdminDashboard from '../pages/admin/Dashboard.jsx'
import UsersList from '../pages/admin/UsersList.jsx'
import PendingDoctors from '../pages/admin/PendingDoctors.jsx'

import useAuth from '../hooks/useAuth.js'

function RoleLanding() {
  const { role } = useAuth()
  if (role === 'DOCTOR') return <Navigate to="/doctor/dashboard" replace />
  if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />
  return <Navigate to="/patient/dashboard" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<RoleLanding />} />

        <Route element={<DashboardLayout />}>
          {/* Patient */}
          <Route element={<RoleRoute allowedRoles={[ROLES.PATIENT]} />}>
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/cycle-tracker" element={<CycleTracker />} />
            <Route path="/patient/symptom-tracker" element={<SymptomTracker />} />
            <Route path="/patient/medications" element={<MedicationReminder />} />
            <Route path="/patient/doctors" element={<DoctorSearch />} />
            <Route path="/patient/doctors/:id" element={<DoctorDetails />} />
            <Route path="/patient/appointments/book/:doctorId" element={<AppointmentBooking />} />
            <Route path="/patient/appointments" element={<AppointmentHistory />} />
            <Route path="/patient/predictions" element={<PredictionCenter />} />
            <Route path="/patient/health-tips" element={<HealthTips />} />
          </Route>

          {/* Doctor */}
          <Route element={<RoleRoute allowedRoles={[ROLES.DOCTOR]} />}>
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/availability" element={<DoctorAvailability />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          </Route>

          {/* Admin */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/pending-doctors" element={<PendingDoctors />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

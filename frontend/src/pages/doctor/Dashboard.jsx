import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Card, CardContent, Typography, Box, Button, Stack } from '@mui/material'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import StatusChip from '../../components/common/StatusChip.jsx'
import useAuth from '../../hooks/useAuth.js'
import appointmentService from '../../services/appointmentService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate } from '../../utils/formatters.js'
import { APPOINTMENT_STATUS_COLOR } from '../../utils/enums.js'

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    appointmentService
      .getDoctorAppointments()
      .then(({ data }) => mounted && setAppointments(data || []))
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <LoadingSpinner label="Loading dashboard…" minHeight={400} />

  const pending = appointments.filter((a) => a.status === 'PENDING')
  const approved = appointments.filter((a) => a.status === 'APPROVED')
  const completed = appointments.filter((a) => a.status === 'COMPLETED')

  return (
    <Box>
      <PageHeader
        title={`Welcome, Dr. ${user?.fullName?.split(' ')[0] || ''}`}
        subtitle="Here's your appointment overview."
      />
      <ErrorAlert message={error} onClose={() => setError('')} />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Appointments" value={appointments.length} icon={<EventNoteRoundedIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Pending Approval" value={pending.length} icon={<PendingActionsRoundedIcon />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Approved" value={approved.length} icon={<CheckCircleRoundedIcon />} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Completed" value={completed.length} icon={<TaskAltRoundedIcon />} color="success" />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="h6" fontWeight={700}>
              Pending Requests
            </Typography>
            <Button
              component={RouterLink}
              to="/doctor/appointments"
              size="small"
              endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
            >
              Manage all
            </Button>
          </Stack>
          {pending.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No pending appointment requests right now.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {pending.slice(0, 5).map((appt) => (
                <Box
                  key={appt.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {appt.patientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(appt.appointmentDate)} · {appt.appointmentTime}
                    </Typography>
                  </Box>
                  <StatusChip value={appt.status} colorMap={APPOINTMENT_STATUS_COLOR} />
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Card, CardContent, Typography, Box, Button, Stack, Chip } from '@mui/material'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import StatusChip from '../../components/common/StatusChip.jsx'

import useAuth from '../../hooks/useAuth.js'
import cycleService from '../../services/cycleService.js'
import medicationService from '../../services/medicationService.js'
import appointmentService from '../../services/appointmentService.js'
import predictionService from '../../services/predictionService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate, formatDateTime } from '../../utils/formatters.js'
import { APPOINTMENT_STATUS_COLOR, RISK_LEVEL_COLOR } from '../../utils/enums.js'

export default function PatientDashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cycles, setCycles] = useState([])
  const [medications, setMedications] = useState([])
  const [appointments, setAppointments] = useState([])
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      try {
        const [cycleRes, medRes, apptRes, predRes] = await Promise.all([
          cycleService.getMyCycleRecords(),
          medicationService.getMyMedications(),
          appointmentService.getMyAppointments(),
          predictionService.getPredictionHistory(),
        ])
        if (!mounted) return
        setCycles(cycleRes.data || [])
        setMedications(medRes.data || [])
        setAppointments(apptRes.data || [])
        setPredictions(predRes.data || [])
      } catch (err) {
        if (mounted) setError(getErrorMessage(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <LoadingSpinner label="Loading your dashboard…" minHeight={400} />

  const upcomingAppointments = appointments
    .filter((a) => a.status === 'PENDING' || a.status === 'APPROVED')
    .slice(0, 3)
  const latestPrediction = predictions[0]
  const activeMedications = medications.length

  return (
    <Box>
      <PageHeader
        title={`Hi, ${user?.fullName?.split(' ')[0] || 'there'} 👋`}
        subtitle="Here's a snapshot of your health journey."
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Cycle Records" value={cycles.length} icon={<CalendarMonthRoundedIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Active Medications"
            value={activeMedications}
            icon={<MedicationRoundedIcon />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Upcoming Appointments"
            value={upcomingAppointments.length}
            icon={<EventAvailableRoundedIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Latest Risk Level"
            value={latestPrediction ? latestPrediction.riskLevel : '—'}
            icon={<InsightsRoundedIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h6" fontWeight={700}>
                  Upcoming Appointments
                </Typography>
                <Button
                  component={RouterLink}
                  to="/patient/appointments"
                  size="small"
                  endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                >
                  View all
                </Button>
              </Stack>
              {upcomingAppointments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No upcoming appointments. Book one with a doctor that fits your needs.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {upcomingAppointments.map((appt) => (
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
                          Dr. {appt.doctorName}
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
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="h6" fontWeight={700}>
                  PCOD Risk Snapshot
                </Typography>
                <Button
                  component={RouterLink}
                  to="/patient/predictions"
                  size="small"
                  endIcon={<ArrowForwardRoundedIcon fontSize="small" />}
                >
                  Check now
                </Button>
              </Stack>
              {latestPrediction ? (
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Chip
  label={latestPrediction.riskLevel}
  sx={{
    bgcolor: RISK_LEVEL_COLOR[latestPrediction.riskLevel]?.background,
    color: RISK_LEVEL_COLOR[latestPrediction.riskLevel]?.color,
    fontWeight: 600,
  }}
/>
                    <Typography variant="body2" color="text.secondary">
                      Score: {latestPrediction.predictionScore}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {latestPrediction.recommendation}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last assessed: {formatDateTime(latestPrediction.predictionDate)}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  You haven't taken a PCOD risk assessment yet. It only takes a minute.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

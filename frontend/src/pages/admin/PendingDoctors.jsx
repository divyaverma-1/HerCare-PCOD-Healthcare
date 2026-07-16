import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Stack,
  Button,
  Chip,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import adminService from '../../services/adminService.js'
import { getErrorMessage } from '../../api/axiosClient.js'

export default function PendingDoctors() {
  const { enqueueSnackbar } = useSnackbar()
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actioningId, setActioningId] = useState(null)

  const loadPending = async () => {
    setLoading(true)
    try {
      const { data } = await adminService.getPendingDoctors()
      setPending(data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPending()
  }, [])

  const handleDecision = async (doctorId, decision) => {
    setActioningId(doctorId)
    try {
      if (decision === 'approve') {
        await adminService.approveDoctor(doctorId)
        enqueueSnackbar('Doctor approved', { variant: 'success' })
      } else {
        await adminService.rejectDoctor(doctorId)
        enqueueSnackbar('Doctor application rejected', { variant: 'info' })
      }
      loadPending()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setActioningId(null)
    }
  }

  if (loading) return <LoadingSpinner label="Loading pending doctors…" minHeight={300} />

  return (
    <Box>
      <PageHeader
        title="Pending Doctor Approvals"
        subtitle="Review and approve doctors waiting to join HerCare."
      />
      <ErrorAlert message={error} onClose={() => setError('')} />

      {pending.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              icon={<HowToRegRoundedIcon fontSize="inherit" />}
              title="No pending applications"
              subtitle="New doctor registrations awaiting approval will show up here."
            />
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {pending.map((doctor) => {
            const initials = (doctor.fullName || 'D')
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
            return (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
                        {initials}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          Dr. {doctor.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {doctor.email}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip size="small" label={doctor.phoneNumber || 'No phone'} />
                      <Chip size="small" label="Awaiting Approval" color="warning" />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={actioningId === doctor.id}
                        onClick={() => handleDecision(doctor.id, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        size="small"
                        disabled={actioningId === doctor.id}
                        onClick={() => handleDecision(doctor.id, 'reject')}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}

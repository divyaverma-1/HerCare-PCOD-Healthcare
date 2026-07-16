import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Box, Card, CardContent, Typography, Stack, Avatar, TextField, Button, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import doctorService from '../../services/doctorService.js'
import appointmentService from '../../services/appointmentService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { humanize } from '../../utils/enums.js'
import { formatCurrency } from '../../utils/formatters.js'

export default function AppointmentBooking() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { appointmentDate: null, appointmentTime: null, reason: '' },
  })

  useEffect(() => {
    let mounted = true
    doctorService
      .getDoctorById(doctorId)
      .then(({ data }) => mounted && setDoctor(data))
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [doctorId])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        doctorId: Number(doctorId),
        appointmentDate: values.appointmentDate
          ? dayjs(values.appointmentDate).format('YYYY-MM-DD')
          : null,
        appointmentTime: values.appointmentTime
          ? dayjs(values.appointmentTime).format('HH:mm:ss')
          : null,
        reason: values.reason,
      }
      await appointmentService.bookAppointment(payload)
      enqueueSnackbar('Appointment request sent!', { variant: 'success' })
      navigate('/patient/appointments')
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading doctor details…" />

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <ErrorAlert message={error} onClose={() => setError('')} />

      {doctor && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', width: 56, height: 56 }}>
                {(doctor.doctorName || 'D').charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Dr. {doctor.doctorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {humanize(doctor.specialization)} · {formatCurrency(doctor.consultationFee)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Book Appointment
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="appointmentDate"
                  control={control}
                  rules={{ required: 'Please select a date' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Appointment Date"
                      minDate={dayjs()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.appointmentDate,
                          helperText: errors.appointmentDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="appointmentTime"
                  control={control}
                  rules={{ required: 'Please select a time' }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Appointment Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.appointmentTime,
                          helperText: errors.appointmentTime?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Reason for visit"
                  fullWidth
                  multiline
                  minRows={3}
                  {...register('reason', { required: 'Please describe your reason for visit' })}
                  error={!!errors.reason}
                  helperText={errors.reason?.message}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth size="large" disabled={submitting} sx={{ mt: 3 }}>
              {submitting ? 'Booking…' : 'Confirm Booking'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

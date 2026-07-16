import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Typography,
  Avatar,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MedicationRoundedIcon from '@mui/icons-material/MedicationRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import medicationService from '../../services/medicationService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate, formatTime } from '../../utils/formatters.js'
import { MEDICATION_FREQUENCY_OPTIONS, humanize } from '../../utils/enums.js'

export default function MedicationReminder() {
  const { enqueueSnackbar } = useSnackbar()
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicineName: '',
      dosage: '',
      startDate: dayjs(),
      endDate: null,
      reminderTime: null,
      frequency: 'DAILY',
    },
  })

  const loadMedications = async () => {
    setLoading(true)
    try {
      const { data } = await medicationService.getMyMedications()
      setMedications(data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedications()
  }, [])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        ...values,
        startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : null,
        endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : null,
        reminderTime: values.reminderTime ? dayjs(values.reminderTime).format('HH:mm:ss') : null,
      }
      await medicationService.addMedication(payload)
      enqueueSnackbar('Medication added', { variant: 'success' })
      setDialogOpen(false)
      reset({
        medicineName: '',
        dosage: '',
        startDate: dayjs(),
        endDate: null,
        reminderTime: null,
        frequency: 'DAILY',
      })
      loadMedications()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <PageHeader
        title="Medication Reminder"
        subtitle="Keep track of your medicines and reminder times."
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
            Add Medication
          </Button>
        }
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      {loading ? (
        <LoadingSpinner label="Loading medications…" />
      ) : medications.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              title="No medications added"
              subtitle="Add a medication to get reminders and keep a record for your doctor."
              action={
                <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                  Add your first medication
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {medications.map((m) => (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }}>
                      <MedicationRoundedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {m.medicineName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {m.dosage}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap" useFlexGap>
                    <Chip size="small" label={humanize(m.frequency)} color="primary" variant="outlined" />
                    <Chip
                      size="small"
                      icon={<AccessTimeRoundedIcon fontSize="small" />}
                      label={formatTime(m.reminderTime)}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {formatDate(m.startDate)} — {m.endDate ? formatDate(m.endDate) : 'Ongoing'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Medication</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Medicine Name"
                  fullWidth
                  {...register('medicineName', { required: 'Medicine name is required' })}
                  error={!!errors.medicineName}
                  helperText={errors.medicineName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Dosage (e.g. 500mg)"
                  fullWidth
                  {...register('dosage', { required: 'Dosage is required' })}
                  error={!!errors.dosage}
                  helperText={errors.dosage?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startDate,
                          helperText: errors.startDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker {...field} label="End Date (optional)" slotProps={{ textField: { fullWidth: true } }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="reminderTime"
                  control={control}
                  render={({ field }) => (
                    <TimePicker {...field} label="Reminder Time" slotProps={{ textField: { fullWidth: true } }} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Frequency" fullWidth defaultValue="DAILY" {...register('frequency')}>
                  {MEDICATION_FREQUENCY_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Medication'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

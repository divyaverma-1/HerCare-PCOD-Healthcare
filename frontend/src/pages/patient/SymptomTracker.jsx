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
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import symptomService from '../../services/symptomService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate } from '../../utils/formatters.js'
import { SYMPTOM_TYPE_OPTIONS, SEVERITY_OPTIONS, SEVERITY_COLOR, humanize } from '../../utils/enums.js'

export default function SymptomTracker() {
  const { enqueueSnackbar } = useSnackbar()
  const [symptoms, setSymptoms] = useState([])
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
    defaultValues: { symptomType: 'ACNE', severity: 'LOW', date: dayjs(), notes: '' },
  })

  const loadSymptoms = async () => {
    setLoading(true)
    try {
      const { data } = await symptomService.getMySymptoms()
      setSymptoms([...(data || [])].sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSymptoms()
  }, [])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = { ...values, date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null }
      await symptomService.addSymptom(payload)
      enqueueSnackbar('Symptom logged', { variant: 'success' })
      setDialogOpen(false)
      reset({ symptomType: 'ACNE', severity: 'LOW', date: dayjs(), notes: '' })
      loadSymptoms()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <PageHeader
        title="Symptom Tracker"
        subtitle="Keep a record of symptoms to share with your doctor."
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
            Log Symptom
          </Button>
        }
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      {loading ? (
        <LoadingSpinner label="Loading symptoms…" />
      ) : symptoms.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              title="No symptoms logged yet"
              subtitle="Track how you're feeling day to day to notice patterns."
              action={
                <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                  Log your first symptom
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {symptoms.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="subtitle1" fontWeight={700}>
                      {humanize(s.symptomType)}
                    </Typography>
                    <Chip
  size="small"
  label={humanize(s.severity)}
  sx={{
    bgcolor: SEVERITY_COLOR[s.severity]?.background,
    color: SEVERITY_COLOR[s.severity]?.color,
    fontWeight: 600,
  }}
/>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(s.date)}
                  </Typography>
                  {s.notes && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {s.notes}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Log Symptom</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField select label="Symptom" fullWidth defaultValue="ACNE" {...register('symptomType')}>
                  {SYMPTOM_TYPE_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Severity" fullWidth defaultValue="LOW" {...register('severity')}>
                  {SEVERITY_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      maxDate={dayjs()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes (optional)"
                  fullWidth
                  multiline
                  minRows={3}
                  {...register('notes')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Saving…' : 'Save Symptom'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

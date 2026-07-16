import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import doctorService from '../../services/doctorService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatTime } from '../../utils/formatters.js'
import { DAY_OF_WEEK_OPTIONS, humanize } from '../../utils/enums.js'

export default function Availability() {
  const { enqueueSnackbar } = useSnackbar()
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { day: 'MONDAY', startTime: null, endTime: null },
  })

  const loadAvailability = async () => {
    setLoading(true)
    try {
      const { data } = await doctorService.getMyAvailability()
      setSlots(data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAvailability()
  }, [])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        day: values.day,
        startTime: values.startTime ? dayjs(values.startTime).format('HH:mm:ss') : null,
        endTime: values.endTime ? dayjs(values.endTime).format('HH:mm:ss') : null,
      }
      await doctorService.addAvailability(payload)
      enqueueSnackbar('Availability slot added', { variant: 'success' })
      reset({ day: 'MONDAY', startTime: null, endTime: null })
      loadAvailability()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <PageHeader title="My Availability" subtitle="Set the days and times you're available for appointments." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField select label="Day" fullWidth defaultValue="MONDAY" {...register('day')}>
                  {DAY_OF_WEEK_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Controller
                  name="startTime"
                  control={control}
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="Start Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.startTime,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Controller
                  name="endTime"
                  control={control}
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      label="End Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.endTime,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<AddRoundedIcon />}
                  disabled={submitting}
                  sx={{ height: 40 }}
                >
                  {submitting ? 'Adding…' : 'Add Slot'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {loading ? (
            <LoadingSpinner label="Loading availability…" />
          ) : slots.length === 0 ? (
            <EmptyState title="No availability slots set" subtitle="Add your working hours above." />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slots.map((s) => (
                    <TableRow key={s.id} hover>
                      <TableCell>
                        <Chip size="small" label={humanize(s.day)} color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{formatTime(s.startTime)}</TableCell>
                      <TableCell>{formatTime(s.endTime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

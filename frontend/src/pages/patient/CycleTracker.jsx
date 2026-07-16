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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import cycleService from '../../services/cycleService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate } from '../../utils/formatters.js'
import { CYCLE_FLOW_OPTIONS, humanize } from '../../utils/enums.js'

export default function CycleTracker() {
  const { enqueueSnackbar } = useSnackbar()
  const [records, setRecords] = useState([])
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
      periodStartDate: null,
      periodEndDate: null,
      cycleLength: '',
      periodLength: '',
      flow: 'MEDIUM',
    },
  })

  const loadRecords = async () => {
    setLoading(true)
    try {
      const { data } = await cycleService.getMyCycleRecords()
      setRecords(
        [...(data || [])].sort(
          (a, b) => new Date(b.periodStartDate) - new Date(a.periodStartDate),
        ),
      )
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        ...values,
        periodStartDate: values.periodStartDate
          ? dayjs(values.periodStartDate).format('YYYY-MM-DD')
          : null,
        periodEndDate: values.periodEndDate
          ? dayjs(values.periodEndDate).format('YYYY-MM-DD')
          : null,
        cycleLength: values.cycleLength ? Number(values.cycleLength) : null,
        periodLength: values.periodLength ? Number(values.periodLength) : null,
      }
      await cycleService.saveCycleRecord(payload)
      enqueueSnackbar('Cycle record saved', { variant: 'success' })
      setDialogOpen(false)
      reset()
      loadRecords()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const avgCycleLength = records.length
    ? Math.round(records.reduce((sum, r) => sum + (r.cycleLength || 0), 0) / records.length)
    : null

  return (
    <Box>
      <PageHeader
        title="Cycle Tracker"
        subtitle="Log your periods to spot patterns over time."
        action={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>
            Log Period
          </Button>
        }
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Records
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {records.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Avg. Cycle Length
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {avgCycleLength ? `${avgCycleLength} days` : '—'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Last Period Start
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {records[0] ? formatDate(records[0].periodStartDate) : '—'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          {loading ? (
            <LoadingSpinner label="Loading cycle records…" />
          ) : records.length === 0 ? (
            <EmptyState
              title="No cycle records yet"
              subtitle="Start logging your periods to track your cycle length and flow over time."
              action={
                <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                  Log your first period
                </Button>
              }
            />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Cycle Length</TableCell>
                    <TableCell>Period Length</TableCell>
                    <TableCell>Flow</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell>{formatDate(r.periodStartDate)}</TableCell>
                      <TableCell>{formatDate(r.periodEndDate)}</TableCell>
                      <TableCell>{r.cycleLength ? `${r.cycleLength} days` : '—'}</TableCell>
                      <TableCell>{r.periodLength ? `${r.periodLength} days` : '—'}</TableCell>
                      <TableCell>
                        <Chip size="small" label={humanize(r.flow)} color="primary" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Log Period</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="periodStartDate"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Period Start Date"
                      maxDate={dayjs()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.periodStartDate,
                          helperText: errors.periodStartDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="periodEndDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Period End Date"
                      maxDate={dayjs()}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cycle Length (days)"
                  type="number"
                  fullWidth
                  {...register('cycleLength')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Period Length (days)"
                  type="number"
                  fullWidth
                  {...register('periodLength')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Flow" fullWidth defaultValue="MEDIUM" {...register('flow')}>
                  {CYCLE_FLOW_OPTIONS.map((opt) => (
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
              {submitting ? 'Saving…' : 'Save Record'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  )
}

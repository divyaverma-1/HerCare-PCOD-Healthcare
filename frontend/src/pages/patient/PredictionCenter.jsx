import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import { useSnackbar } from 'notistack'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import predictionService from '../../services/predictionService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDateTime } from '../../utils/formatters.js'
import { RISK_LEVEL_COLOR } from '../../utils/enums.js'

const booleanFields = [
  { name: 'irregularPeriods', label: 'Irregular Periods' },
  { name: 'acne', label: 'Acne' },
  { name: 'hairGrowth', label: 'Excess Hair Growth' },
  { name: 'hairLoss', label: 'Hair Loss / Thinning' },
  { name: 'weightGain', label: 'Unexplained Weight Gain' },
  { name: 'familyHistory', label: 'Family History of PCOD/PCOS' },
]

export default function PredictionCenter() {
  const { enqueueSnackbar } = useSnackbar()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [latestResult, setLatestResult] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: '',
      height: '',
      weight: '',
      exerciseDays: '',
      irregularPeriods: false,
      acne: false,
      hairGrowth: false,
      hairLoss: false,
      weightGain: false,
      familyHistory: false,
    },
  })

  const loadHistory = async () => {
    setLoading(true)
    try {
      const { data } = await predictionService.getPredictionHistory()
      setHistory(
        [...(data || [])].sort((a, b) => new Date(b.predictionDate) - new Date(a.predictionDate)),
      )
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        ...values,
        age: Number(values.age),
        height: Number(values.height),
        weight: Number(values.weight),
        exerciseDays: Number(values.exerciseDays),
      }
      const { data } = await predictionService.predict(payload)
      setLatestResult(data)
      enqueueSnackbar('Assessment complete', { variant: 'success' })
      loadHistory()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <PageHeader
        title="PCOD Risk Assessment"
        subtitle="Answer a few questions to get an indicative PCOD/PCOS risk score."
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                New Assessment
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Age"
                      type="number"
                      fullWidth
                      {...register('age', { required: true, min: 10, max: 100 })}
                      error={!!errors.age}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Height (cm)"
                      type="number"
                      fullWidth
                      {...register('height', { required: true, min: 100, max: 220 })}
                      error={!!errors.height}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      fullWidth
                      {...register('weight', { required: true, min: 25, max: 250 })}
                      error={!!errors.weight}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      label="Exercise (days/week)"
                      type="number"
                      fullWidth
                      {...register('exerciseDays', { required: true, min: 0, max: 7 })}
                      error={!!errors.exerciseDays}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2.5 }} />

                <Grid container spacing={1}>
                  {booleanFields.map((f) => (
                    <Grid item xs={12} sm={6} key={f.name}>
                      <Controller
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                            label={f.label}
                          />
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Button type="submit" variant="contained" size="large" disabled={submitting} sx={{ mt: 3 }} fullWidth>
                  {submitting ? 'Analyzing…' : 'Get My Risk Assessment'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Result
              </Typography>
              {latestResult ? (
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <InsightsRoundedIcon color="primary" />
                    <Chip
  label={`${latestResult.riskLevel} RISK`}
  sx={{
    bgcolor: RISK_LEVEL_COLOR[latestResult.riskLevel]?.background,
    color: RISK_LEVEL_COLOR[latestResult.riskLevel]?.color,
    fontWeight: 600,
  }}
/>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    BMI: <b>{latestResult.bmi}</b> · Score: <b>{latestResult.predictionScore}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1.5 }}>
                    {latestResult.recommendation}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    This is an indicative assessment only and not a medical diagnosis. Please consult
                    a doctor for a professional evaluation.
                  </Typography>
                </Box>
              ) : (
                <EmptyState
                  icon={<InsightsRoundedIcon fontSize="inherit" />}
                  title="No result yet"
                  subtitle="Fill out the form to get your risk assessment."
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Assessment History
          </Typography>
          {loading ? (
            <LoadingSpinner label="Loading history…" minHeight={160} />
          ) : history.length === 0 ? (
            <EmptyState title="No past assessments" />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>BMI</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Risk Level</TableCell>
                    <TableCell>Recommendation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((h) => (
                    <TableRow key={h.id} hover>
                      <TableCell>{formatDateTime(h.predictionDate)}</TableCell>
                      <TableCell>{h.bmi}</TableCell>
                      <TableCell>{h.predictionScore}</TableCell>
                      <TableCell>
                        <Chip
  size="small"
  label={h.riskLevel}
  sx={{
    bgcolor: RISK_LEVEL_COLOR[h.riskLevel]?.background,
    color: RISK_LEVEL_COLOR[h.riskLevel]?.color,
    fontWeight: 600,
  }}
/>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 280 }}>{h.recommendation}</TableCell>
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

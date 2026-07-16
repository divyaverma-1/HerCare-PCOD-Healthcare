import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  MenuItem,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import useAuth from '../../hooks/useAuth.js'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import { GENDER_OPTIONS, ROLES } from '../../utils/enums.js'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      dateOfBirth: null,
      gender: 'FEMALE',
      role: ROLES.PATIENT,
    },
  })

  const onSubmit = async (values) => {
    setServerError('')
    setSubmitting(true)
    try {
      await registerUser({
        ...values,
        dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
      })
      enqueueSnackbar('Account created! Please log in.', { variant: 'success' })
      navigate('/login')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Create your account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Join HerCare to start tracking your health journey.
      </Typography>

      <ErrorAlert message={serverError} onClose={() => setServerError('')} />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <ToggleButtonGroup
            {...field}
            exclusive
            fullWidth
            size="small"
            onChange={(_, val) => val && field.onChange(val)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value={ROLES.PATIENT}>Patient</ToggleButton>
            <ToggleButton value={ROLES.DOCTOR}>Doctor</ToggleButton>
          </ToggleButtonGroup>
        )}
      />

      <TextField
        label="Full Name"
        fullWidth
        margin="dense"
        {...register('fullName', { required: 'Full name is required' })}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="dense"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="dense"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'At least 6 characters' },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Grid container spacing={1.5}>
        <Grid item xs={6}>
          <TextField
            label="Phone Number"
            fullWidth
            margin="dense"
            {...register('phoneNumber', { required: 'Phone number is required' })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Gender"
            fullWidth
            margin="dense"
            defaultValue="FEMALE"
            {...register('gender', { required: true })}
          >
            {GENDER_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Controller
        name="dateOfBirth"
        control={control}
        rules={{ required: 'Date of birth is required' }}
        render={({ field }) => (
          <DatePicker
            {...field}
            label="Date of Birth"
            maxDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'dense',
                error: !!errors.dateOfBirth,
                helperText: errors.dateOfBirth?.message,
              },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={submitting}
        sx={{ mt: 3, mb: 2, py: 1.2 }}
      >
        {submitting ? 'Creating account…' : 'Register'}
      </Button>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Already have an account?{' '}
        <Link component={RouterLink} to="/login" fontWeight={600}>
          Login
        </Link>
      </Typography>
    </Box>
  )
}

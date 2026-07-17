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
import {
  GENDER_OPTIONS,
  ROLES,
  DOCTOR_SPECIALIZATIONS,
  MEDICAL_COUNCILS,
} from '../../utils/enums.js'

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
  watch,
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

    medicalRegistrationNumber: '',
    medicalCouncil: '',
    specialization: '',
    hospitalName: '',
  },
})

const selectedRole = watch('role')

  const onSubmit = async (values) => {
  setServerError('')
  setSubmitting(true)

  try {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
        : null,
    }

    if (values.role !== ROLES.DOCTOR) {
      delete payload.medicalRegistrationNumber
      delete payload.medicalCouncil
      delete payload.specialization
      delete payload.hospitalName
    }

    await registerUser(payload)

    enqueueSnackbar(
  values.role === ROLES.DOCTOR
    ? 'Registration submitted successfully. Your medical registration will be verified by the admin before you can log in.'
    : 'Registration successful. Please log in.',
  {
    variant: 'success',
  }
)

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
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      message:
        'Must contain uppercase, lowercase, number and special character',
    },
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
  {...register('phoneNumber', {
    required: 'Phone Number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Enter a valid 10-digit phone number',
    },
  })}
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
{selectedRole === ROLES.DOCTOR && (
  <>
    <Typography
      variant="h6"
      sx={{
        mt: 3,
        mb: 1,
        fontWeight: 600,
      }}
    >
      Doctor Verification
    </Typography>

      <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mb: 2 }}
>
  Your registration number will be verified by the administrator before your account is approved.
</Typography>
      
    <TextField
      label="Medical Registration Number"
      fullWidth
      margin="dense"
      {...register('medicalRegistrationNumber', {
        required:
          selectedRole === ROLES.DOCTOR
            ? 'Medical Registration Number is required'
            : false,
      })}
      error={!!errors.medicalRegistrationNumber}
      helperText={errors.medicalRegistrationNumber?.message}
    />

    <TextField
      select
      label="Medical Council"
      fullWidth
      margin="dense"
      defaultValue=""
      {...register('medicalCouncil')}
    >
      <MenuItem value="">
        Select Medical Council
      </MenuItem>

      {MEDICAL_COUNCILS.map((council) => (
        <MenuItem
          key={council.value}
          value={council.value}
        >
          {council.label}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      label="Specialization"
      fullWidth
      margin="dense"
      defaultValue=""
      {...register('specialization')}
    >
      <MenuItem value="">
        Select Specialization
      </MenuItem>

      {DOCTOR_SPECIALIZATIONS.map((item) => (
        <MenuItem
          key={item.value}
          value={item.value}
        >
          {item.label}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      label="Hospital Name"
      fullWidth
      margin="dense"
      {...register('hospitalName')}
    />
  </>
)}
      <Button
  type="submit"
  fullWidth
  variant="contained"
  size="large"
  disabled={submitting}
  sx={{
    mt: 3,
    py: 1.4,
    borderRadius: 3,
    fontWeight: 600,
  }}
>
  {submitting
    ? 'Creating Account...'
    : selectedRole === ROLES.DOCTOR
      ? 'Register as Doctor'
      : 'Create Account'}
</Button>

      <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mb: 2 }}
>
  Create your HerCare account to manage PCOD care, appointments and health records.
</Typography>
    </Box>
  )
}

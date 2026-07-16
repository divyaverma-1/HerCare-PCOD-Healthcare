import { useState } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import { useSnackbar } from 'notistack'
import useAuth from '../../hooks/useAuth.js'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (values) => {
    setServerError('')
    setSubmitting(true)
    try {
      const { role } = await login(values)
      enqueueSnackbar('Welcome back!', { variant: 'success' })
      const redirectTo =
        location.state?.from?.pathname ||
        (role === 'DOCTOR'
          ? '/doctor/dashboard'
          : role === 'ADMIN'
            ? '/admin/dashboard'
            : '/patient/dashboard')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Welcome back
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Log in to continue managing your care.
      </Typography>

      <ErrorAlert message={serverError} onClose={() => setServerError('')} />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((p) => !p)} edge="end" size="small">
                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
        {submitting ? 'Logging in…' : 'Login'}
      </Button>

      <Typography variant="body2" textAlign="center" color="text.secondary">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to="/register" fontWeight={600}>
          Register
        </Link>
      </Typography>
    </Box>
  )
}

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardContent, Grid, TextField, MenuItem, Button, Box, Avatar, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import profileService from '../../services/profileService.js'
import useAuth from '../../hooks/useAuth.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { GENDER_OPTIONS } from '../../utils/enums.js'

export default function PatientProfile() {
  const { setUser } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: '', phoneNumber: '', dateOfBirth: null, gender: 'FEMALE' },
  })

  useEffect(() => {
    let mounted = true
    profileService
      .getMyProfile()
      .then(({ data }) => {
        if (!mounted) return
        setProfile(data)
        reset({
          fullName: data.fullName || '',
          phoneNumber: data.phoneNumber || '',
          dateOfBirth: data.dateOfBirth ? dayjs(data.dateOfBirth) : null,
          gender: data.gender || 'FEMALE',
        })
      })
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [reset])

  const onSubmit = async (values) => {
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...values,
        dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
      }
      const { data } = await profileService.updateMyProfile(payload)
      setProfile(data)
      setUser(data)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading your profile…" />

  const initials = (profile?.fullName || 'U')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <Box>
      <PageHeader title="My Profile" subtitle="Manage your personal details." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      <Card>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24 }}>
              {initials}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {profile?.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile?.email} · {profile?.role}
              </Typography>
            </Box>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  fullWidth
                  {...register('fullName', { required: 'Full name is required' })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      maxDate={dayjs()}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select label="Gender" fullWidth {...register('gender')}>
                  {GENDER_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" disabled={saving} sx={{ mt: 3 }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

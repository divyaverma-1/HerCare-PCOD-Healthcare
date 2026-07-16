import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Card, CardContent, Grid, TextField, MenuItem, Button, Typography, Alert } from '@mui/material'
import { useSnackbar } from 'notistack'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import doctorService from '../../services/doctorService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { DOCTOR_SPECIALIZATION_OPTIONS } from '../../utils/enums.js'

export default function DoctorProfile() {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState(null)
  const [exists, setExists] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qualification: '',
      experience: '',
      specialization: 'GYNECOLOGIST',
      hospitalName: '',
      about: '',
      consultationFee: '',
    },
  })

  useEffect(() => {
    let mounted = true
    doctorService
      .getMyProfile()
      .then(({ data }) => {
        if (!mounted) return
        setProfile(data)
        setExists(true)
        reset({
          qualification: data.qualification || '',
          experience: data.experience ?? '',
          specialization: data.specialization || 'GYNECOLOGIST',
          hospitalName: data.hospitalName || '',
          about: data.about || '',
          consultationFee: data.consultationFee ?? '',
        })
      })
      .catch(() => {
        // no profile created yet — that's fine, form stays empty
        setExists(false)
      })
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
        experience: Number(values.experience),
        consultationFee: Number(values.consultationFee),
      }
      const { data } = exists
        ? await doctorService.updateMyProfile(payload)
        : await doctorService.createMyProfile(payload)
      setProfile(data)
      setExists(true)
      enqueueSnackbar('Doctor profile saved', { variant: 'success' })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading profile…" />

  return (
    <Box>
      <PageHeader title="My Doctor Profile" subtitle="This information is visible to patients." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      {!exists && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          You haven't set up your doctor profile yet. Complete it so patients can find and book you.
          {profile?.active === false && ' Your profile is pending admin approval.'}
        </Alert>
      )}
      {exists && profile?.active === false && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
          Your profile is pending admin approval and won't be visible to patients yet.
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Qualification"
                  fullWidth
                  {...register('qualification', { required: 'Qualification is required' })}
                  error={!!errors.qualification}
                  helperText={errors.qualification?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Experience (years)"
                  type="number"
                  fullWidth
                  {...register('experience', { required: 'Experience is required', min: 0 })}
                  error={!!errors.experience}
                  helperText={errors.experience?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Specialization"
                  fullWidth
                  defaultValue="GYNECOLOGIST"
                  {...register('specialization', { required: true })}
                >
                  {DOCTOR_SPECIALIZATION_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Consultation Fee (₹)"
                  type="number"
                  fullWidth
                  {...register('consultationFee', { required: 'Consultation fee is required', min: 0 })}
                  error={!!errors.consultationFee}
                  helperText={errors.consultationFee?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Hospital / Clinic Name"
                  fullWidth
                  {...register('hospitalName', { required: 'Hospital name is required' })}
                  error={!!errors.hospitalName}
                  helperText={errors.hospitalName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="About" fullWidth multiline minRows={4} {...register('about')} />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" disabled={saving} sx={{ mt: 3 }}>
              {saving ? 'Saving…' : exists ? 'Update Profile' : 'Create Profile'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Divider,
} from '@mui/material'
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded'
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import doctorService from '../../services/doctorService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatCurrency } from '../../utils/formatters.js'
import { humanize } from '../../utils/enums.js'

export default function DoctorDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    doctorService
      .getDoctorById(id)
      .then(({ data }) => mounted && setDoctor(data))
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [id])

  if (loading) return <LoadingSpinner label="Loading doctor profile…" />
  if (error) return <ErrorAlert message={error} />
  if (!doctor) return null

  return (
    <Box>
      <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} textAlign={{ xs: 'center', sm: 'left' }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  width: 96,
                  height: 96,
                  fontSize: 36,
                  mx: { xs: 'auto', sm: 0 },
                  mb: 2,
                }}
              >
                {(doctor.doctorName || 'D').charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight={700}>
                Dr. {doctor.doctorName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {doctor.qualification}
              </Typography>
              <Chip
                icon={<LocalHospitalRoundedIcon fontSize="small" />}
                label={humanize(doctor.specialization)}
                color="primary"
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate(`/patient/appointments/book/${doctor.doctorId || doctor.id}`)}
              >
                Book Appointment
              </Button>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body1">{doctor.about || 'No bio provided yet.'}</Typography>
                </Box>

                <Divider />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <WorkHistoryRoundedIcon color="primary" fontSize="small" />
                      <Typography variant="body2">{doctor.experience ?? 0} years experience</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PaymentsRoundedIcon color="primary" fontSize="small" />
                      <Typography variant="body2">
                        {formatCurrency(doctor.consultationFee)} consultation fee
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocalHospitalRoundedIcon color="primary" fontSize="small" />
                      <Typography variant="body2">{doctor.hospitalName}</Typography>
                    </Stack>
                  </Grid>
                  {doctor.email && (
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <EmailRoundedIcon color="primary" fontSize="small" />
                        <Typography variant="body2">{doctor.email}</Typography>
                      </Stack>
                    </Grid>
                  )}
                  {doctor.phoneNumber && (
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PhoneRoundedIcon color="primary" fontSize="small" />
                        <Typography variant="body2">{doctor.phoneNumber}</Typography>
                      </Stack>
                    </Grid>
                  )}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

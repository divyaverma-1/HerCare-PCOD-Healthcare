import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Typography,
  Stack,
  Chip,
  InputAdornment,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded'
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import doctorService from '../../services/doctorService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatCurrency } from '../../utils/formatters.js'
import { DOCTOR_SPECIALIZATION_OPTIONS, humanize } from '../../utils/enums.js'

export default function DoctorSearch() {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [specialization, setSpecialization] = useState('')

  const loadDoctors = async () => {
    setLoading(true)
    setError('')
    try {
      let res
      if (specialization) {
        res = await doctorService.getBySpecialization(specialization)
      } else if (keyword.trim()) {
        res = await doctorService.searchDoctors(keyword.trim())
      } else {
        res = await doctorService.getAllDoctors()
      }
      setDoctors(res.data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDoctors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialization])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    loadDoctors()
  }

  return (
    <Box>
      <PageHeader title="Find Doctors" subtitle="Search verified doctors by name or specialization." />

      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              placeholder="Search by doctor name or hospital…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              select
              fullWidth
              label="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <MenuItem value="">All Specializations</MenuItem>
              {DOCTOR_SPECIALIZATION_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4} sm={1}>
            <Button type="submit" variant="contained" fullWidth sx={{ height: '100%' }}>
              Go
            </Button>
          </Grid>
        </Grid>
      </Box>

      <ErrorAlert message={error} onClose={() => setError('')} />

      {loading ? (
        <LoadingSpinner label="Finding doctors…" />
      ) : doctors.length === 0 ? (
        <EmptyState
          title="No doctors found"
          subtitle="Try a different search term or specialization."
        />
      ) : (
        <Grid container spacing={2.5}>
          {doctors.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', width: 48, height: 48 }}>
                      {(doc.doctorName || 'D').charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        Dr. {doc.doctorName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.qualification}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    size="small"
                    icon={<LocalHospitalRoundedIcon fontSize="small" />}
                    label={humanize(doc.specialization)}
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                    <WorkHistoryRoundedIcon fontSize="small" color="disabled" />
                    <Typography variant="body2" color="text.secondary">
                      {doc.experience ?? 0} yrs experience
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {doc.hospitalName}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.dark">
                    {formatCurrency(doc.consultationFee)} / consultation
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button fullWidth variant="outlined" onClick={() => navigate(`/patient/doctors/${doc.id}`)}>
                    View Profile
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate(`/patient/appointments/book/${doc.id}`)}
                  >
                    Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

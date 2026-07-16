import { useEffect, useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Chip, Stack } from '@mui/material'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import healthTipService from '../../services/healthTipService.js'
import { getErrorMessage } from '../../api/axiosClient.js'

const categoryColors = ['primary', 'secondary', 'info', 'success', 'warning']

export default function HealthTips() {
  const [tips, setTips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    healthTipService
      .getHealthTips()
      .then(({ data }) => mounted && setTips(data || []))
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <LoadingSpinner label="Loading health tips…" />

  return (
    <Box>
      <PageHeader title="Health Tips" subtitle="Curated guidance to support your PCOD/PCOS care." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      {tips.length === 0 ? (
        <EmptyState
          icon={<TipsAndUpdatesRoundedIcon fontSize="inherit" />}
          title="No health tips available right now"
        />
      ) : (
        <Grid container spacing={2.5}>
          {tips.map((tip, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    <TipsAndUpdatesRoundedIcon color="primary" fontSize="small" />
                    <Chip
                      size="small"
                      label={tip.category}
                      color={categoryColors[idx % categoryColors.length]}
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

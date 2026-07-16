import { Box, CircularProgress, Typography } from '@mui/material'

export default function LoadingSpinner({ label = 'Loading…', minHeight = 240 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        minHeight,
        width: '100%',
      }}
    >
      <CircularProgress color="primary" size={36} thickness={4} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
}

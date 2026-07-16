import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        bgcolor: 'background.default',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" fontWeight={700} color="primary.main">
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        The page you're looking for doesn't exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Back to Home
      </Button>
    </Box>
  )
}

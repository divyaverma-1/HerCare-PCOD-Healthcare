import { Box, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

export default function Unauthorized() {
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
      <LockRoundedIcon sx={{ fontSize: 56, color: 'primary.main', mb: 1 }} />
      <Typography variant="h5" fontWeight={700}>
        Access Denied
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        You don't have permission to view this page.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Go to Dashboard
      </Button>
    </Box>
  )
}

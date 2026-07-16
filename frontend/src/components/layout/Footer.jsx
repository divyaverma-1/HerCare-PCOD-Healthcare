import { Box, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ py: 2.5, textAlign: 'center' }}>
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} HerCare — PCOD Healthcare Management System
      </Typography>
    </Box>
  )
}

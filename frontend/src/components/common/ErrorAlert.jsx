import { Alert } from '@mui/material'

export default function ErrorAlert({ message, onClose, sx }) {
  if (!message) return null
  return (
    <Alert severity="error" onClose={onClose} sx={{ borderRadius: 2, mb: 2, ...sx }}>
      {message}
    </Alert>
  )
}

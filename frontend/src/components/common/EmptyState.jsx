import { Box, Typography } from '@mui/material'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'

export default function EmptyState({ icon, title = 'Nothing here yet', subtitle, action }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 2,
        color: 'text.secondary',
      }}
    >
      <Box sx={{ fontSize: 44, color: 'primary.light', mb: 1 }}>
        {icon || <InboxRoundedIcon fontSize="inherit" />}
      </Box>
      <Typography variant="subtitle1" fontWeight={600} color="text.primary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 380, mx: 'auto' }}>
          {subtitle}
        </Typography>
      )}
      {action && <Box sx={{ mt: 2 }}>{action}</Box>}
    </Box>
  )
}

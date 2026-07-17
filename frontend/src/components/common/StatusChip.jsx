import { Chip } from '@mui/material'
import { humanize } from '../../utils/enums.js'

export default function StatusChip({
  value,
  colorMap = {},
}) {
  if (!value) return null

  const styles = colorMap[value]

  return (
    <Chip
      size="small"
      label={humanize(value)}
      sx={{
        bgcolor: styles?.background,
        color: styles?.color,
        fontWeight: 600,
      }}
    />
  )
}
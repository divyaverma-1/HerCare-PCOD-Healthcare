import { Chip } from '@mui/material'
import { humanize } from '../../utils/enums.js'

export default function StatusChip({ value, colorMap = {}, defaultColor = 'default' }) {
  if (!value) return null
  const color = colorMap[value] || defaultColor
  return <Chip size="small" label={humanize(value)} color={color} />
}

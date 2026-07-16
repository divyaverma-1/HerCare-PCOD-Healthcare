import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useSnackbar } from 'notistack'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import StatusChip from '../../components/common/StatusChip.jsx'
import appointmentService from '../../services/appointmentService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { formatDate } from '../../utils/formatters.js'
import { APPOINTMENT_STATUS_COLOR } from '../../utils/enums.js'

const TABS = ['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED', 'CANCELLED']

export default function AppointmentHistory() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('ALL')

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await appointmentService.getMyAppointments()
      setAppointments(
        [...(data || [])].sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)),
      )
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const handleCancel = async (id) => {
    try {
      await appointmentService.cancelAppointment(id)
      enqueueSnackbar('Appointment cancelled', { variant: 'success' })
      loadAppointments()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    }
  }

  const filtered = tab === 'ALL' ? appointments : appointments.filter((a) => a.status === tab)

  return (
    <Box>
      <PageHeader
        title="My Appointments"
        subtitle="Track and manage your appointment requests."
        action={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate('/patient/doctors')}
          >
            Book New
          </Button>
        }
      />

      <ErrorAlert message={error} onClose={() => setError('')} />

      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          {TABS.map((t) => (
            <Tab key={t} value={t} label={t === 'ALL' ? 'All' : t.charAt(0) + t.slice(1).toLowerCase()} />
          ))}
        </Tabs>
        <CardContent>
          {loading ? (
            <LoadingSpinner label="Loading appointments…" />
          ) : filtered.length === 0 ? (
            <EmptyState title="No appointments found" subtitle="Nothing to show in this category." />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((appt) => (
                    <TableRow key={appt.id} hover>
                      <TableCell>Dr. {appt.doctorName}</TableCell>
                      <TableCell>{formatDate(appt.appointmentDate)}</TableCell>
                      <TableCell>{appt.appointmentTime}</TableCell>
                      <TableCell sx={{ maxWidth: 220 }}>{appt.reason}</TableCell>
                      <TableCell>
                        <StatusChip value={appt.status} colorMap={APPOINTMENT_STATUS_COLOR} />
                      </TableCell>
                      <TableCell align="right">
                        {appt.status === 'PENDING' && (
                          <Button size="small" color="error" onClick={() => handleCancel(appt.id)}>
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

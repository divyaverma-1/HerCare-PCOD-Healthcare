import { useEffect, useState } from 'react'
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
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
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

export default function DoctorAppointments() {
  const { enqueueSnackbar } = useSnackbar()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('ALL')
  const [actingId, setActingId] = useState(null)

  const loadAppointments = async () => {
    setLoading(true)
    try {
      const { data } = await appointmentService.getDoctorAppointments()
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

  const handleAction = async (id, action) => {
    setActingId(id)
    try {
      if (action === 'approve') await appointmentService.approveAppointment(id)
      if (action === 'reject') await appointmentService.rejectAppointment(id)
      if (action === 'complete') await appointmentService.completeAppointment(id)
      enqueueSnackbar(`Appointment ${action}d`, { variant: 'success' })
      loadAppointments()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setActingId(null)
    }
  }

  const filtered = tab === 'ALL' ? appointments : appointments.filter((a) => a.status === tab)

  return (
    <Box>
      <PageHeader title="Appointments" subtitle="Approve, reject, or complete patient appointment requests." />
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
            <EmptyState title="No appointments found" />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
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
                      <TableCell>{appt.patientName}</TableCell>
                      <TableCell>{formatDate(appt.appointmentDate)}</TableCell>
                      <TableCell>{appt.appointmentTime}</TableCell>
                      <TableCell sx={{ maxWidth: 220 }}>{appt.reason}</TableCell>
                      <TableCell>
                        <StatusChip value={appt.status} colorMap={APPOINTMENT_STATUS_COLOR} />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {appt.status === 'PENDING' && (
                            <>
                              <Button
                                size="small"
                                color="success"
                                variant="outlined"
                                startIcon={<CheckRoundedIcon fontSize="small" />}
                                disabled={actingId === appt.id}
                                onClick={() => handleAction(appt.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                variant="outlined"
                                startIcon={<CloseRoundedIcon fontSize="small" />}
                                disabled={actingId === appt.id}
                                onClick={() => handleAction(appt.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {appt.status === 'APPROVED' && (
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              startIcon={<TaskAltRoundedIcon fontSize="small" />}
                              disabled={actingId === appt.id}
                              onClick={() => handleAction(appt.id, 'complete')}
                            >
                              Complete
                            </Button>
                          )}
                        </Stack>
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

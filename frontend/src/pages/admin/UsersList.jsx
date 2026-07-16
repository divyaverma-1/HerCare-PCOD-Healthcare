import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
  MenuItem,
  Button,
  Stack,
  Avatar,
  Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'

import PageHeader from '../../components/common/PageHeader.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import adminService from '../../services/adminService.js'
import { getErrorMessage } from '../../api/axiosClient.js'
import { humanize } from '../../utils/enums.js'

const ROLE_FILTERS = [
  { value: 'ALL', label: 'All Roles' },
  { value: 'PATIENT', label: 'Patient' },
  { value: 'DOCTOR', label: 'Doctor' },
  { value: 'ADMIN', label: 'Admin' },
]

export default function UsersList() {
  const { enqueueSnackbar } = useSnackbar()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [actioningId, setActioningId] = useState(null)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const { data } = await adminService.getAllUsers()
      setUsers(data || [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleToggleActive = async (user) => {
    setActioningId(user.id)
    try {
      if (user.active) {
        await adminService.deactivateUser(user.id)
        enqueueSnackbar(`${user.fullName} deactivated`, { variant: 'info' })
      } else {
        await adminService.activateUser(user.id)
        enqueueSnackbar(`${user.fullName} activated`, { variant: 'success' })
      }
      loadUsers()
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' })
    } finally {
      setActioningId(null)
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
      const matchesSearch =
        !search ||
        u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
      return matchesRole && matchesSearch
    })
  }, [users, roleFilter, search])

  return (
    <Box>
      <PageHeader title="Users" subtitle="View and manage all registered platform users." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2.5 }}>
        <TextField
          label="Search by name or email"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Role"
          size="small"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          {ROLE_FILTERS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Card>
        <CardContent>
          {loading ? (
            <LoadingSpinner label="Loading users…" />
          ) : filteredUsers.length === 0 ? (
            <EmptyState title="No users found" subtitle="Try adjusting your search or filter." />
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((u) => {
                    const initials = (u.fullName || 'U')
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                    return (
                      <TableRow key={u.id} hover>
                        <TableCell>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: 'primary.light', color: 'primary.dark' }}>
                              {initials}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>
                              {u.fullName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>{u.phoneNumber || '—'}</TableCell>
                        <TableCell>
                          <Chip size="small" label={humanize(u.role)} variant="outlined" color="primary" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={u.active ? 'Active' : 'Inactive'}
                            color={u.active ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant="outlined"
                            color={u.active ? 'error' : 'success'}
                            disabled={actioningId === u.id}
                            onClick={() => handleToggleActive(u)}
                          >
                            {u.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

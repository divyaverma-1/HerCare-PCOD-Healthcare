import { useEffect, useState } from 'react'
import { Grid, Box } from '@mui/material'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded'
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded'
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded'

import PageHeader from '../../components/common/PageHeader.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import ErrorAlert from '../../components/common/ErrorAlert.jsx'
import adminService from '../../services/adminService.js'
import { getErrorMessage } from '../../api/axiosClient.js'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [pendingDoctors, setPendingDoctors] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    Promise.all([
      adminService.getAllUsers(),
      adminService.getPendingDoctors(),
      adminService.getAllDoctors(),
    ])
      .then(([usersRes, pendingRes, doctorsRes]) => {
        if (!mounted) return
        setUsers(usersRes.data || [])
        setPendingDoctors(pendingRes.data || [])
        setDoctors(doctorsRes.data || [])
      })
      .catch((err) => mounted && setError(getErrorMessage(err)))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <LoadingSpinner label="Loading admin dashboard…" minHeight={400} />

  const activeUsers = users.filter((u) => u.active).length
  const inactiveUsers = users.filter((u) => !u.active).length

  return (
    <Box>
      <PageHeader title="Admin Dashboard" subtitle="Platform overview and moderation tools." />
      <ErrorAlert message={error} onClose={() => setError('')} />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Users" value={users.length} icon={<GroupRoundedIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Active Users" value={activeUsers} icon={<GroupRoundedIcon />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Deactivated Users" value={inactiveUsers} icon={<PersonOffRoundedIcon />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Registered Doctors" value={doctors.length} icon={<LocalHospitalRoundedIcon />} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Pending Doctor Approvals" value={pendingDoctors.length} icon={<HowToRegRoundedIcon />} color="secondary" />
        </Grid>
      </Grid>
    </Box>
  )
}

import { Outlet } from 'react-router-dom'
import { Box, Paper, Stack, Typography } from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background:
          'radial-gradient(circle at 15% 20%, #FDEDF2 0%, #FFF7F9 45%, #FFFFFF 100%)',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          overflow: 'hidden',
          minHeight: 560,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 5,
            background: 'linear-gradient(160deg, #E75480 0%, #F45B69 100%)',
            color: '#fff',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <FavoriteRoundedIcon />
            <Typography variant="h5" fontWeight={700}>
              HerCare
            </Typography>
          </Stack>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2, lineHeight: 1.3 }}>
              Understand your body.
              <br />
              Take charge of your care.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Track your cycle, symptoms and medications, connect with trusted
              doctors, and get PCOD/PCOS insights — all in one place.
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            Built for women's health, with care.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 380 }}>
            <Outlet />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

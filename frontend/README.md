# HerCare — Frontend (React 19 + Vite + MUI)

Frontend for the HerCare PCOD/PCOS Healthcare Management System. Talks to the
existing Spring Boot backend via JWT-authenticated REST calls.

## Tech Stack

- React 19 + Vite
- React Router v6
- Material UI (MUI) v6 — Baby Pink / Pink / White / Soft Red / Light Grey theme
- Axios (with JWT auto-attach + 401 auto-logout interceptors)
- React Hook Form
- Context API for auth state
- notistack for toasts

## Getting Started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend, e.g. http://localhost:8080/api
npm run dev
```

App runs at `http://localhost:5173`. Make sure the Spring Boot backend is
running (default `http://localhost:8080`) and CORS is enabled for the
frontend origin.

## Build

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── api/            # axios client + interceptors
├── components/
│   ├── common/     # LoadingSpinner, ErrorAlert, PageHeader, StatusChip, EmptyState
│   ├── layout/      # Navbar, Sidebar, Footer, nav config
│   └── ui/          # StatCard etc.
├── context/         # AuthContext (JWT, role, user)
├── hooks/           # useAuth
├── layouts/         # AuthLayout, DashboardLayout
├── pages/
│   ├── auth/         # Login, Register
│   ├── patient/       # Dashboard, Profile, Cycle/Symptom/Medication trackers,
│   │                    Doctor search/details, Appointments, Predictions, Health Tips
│   ├── doctor/        # Dashboard, Profile, Availability, Appointments
│   └── admin/         # Dashboard, Users, Pending Doctor approvals
├── routes/           # AppRoutes, ProtectedRoute, RoleRoute
├── services/         # one file per backend controller (authService, cycleService, …)
├── utils/            # enums mirrored from backend, formatters
└── theme.js          # MUI theme (HerCare palette)
```

## Auth Flow

- JWT is stored in `localStorage` and attached to every request via an Axios
  request interceptor.
- A response interceptor logs the user out and redirects to `/login` on any
  `401`.
- `ProtectedRoute` blocks unauthenticated access; `RoleRoute` restricts pages
  to `PATIENT`, `DOCTOR`, or `ADMIN` as declared in `AppRoutes.jsx`.

## API Mapping

Every service file maps 1:1 to a backend controller (`/api/auth`,
`/api/profile`, `/api/cycle`, `/api/symptoms`, `/api/medications`,
`/api/doctors`, `/api/appointments`, `/api/predictions`, `/api/health-tips`,
`/api/admin`), and request/response payload shapes mirror the backend DTOs
exactly (see `src/utils/enums.js` for enum values copied from
`com.hercare.backend.enums`).

## Notes

- Set `VITE_API_BASE_URL` in `.env` to point at your backend.
- This was scaffolded to sit inside the existing HerCare monorepo's
  `frontend/` directory, alongside the completed `backend/`.

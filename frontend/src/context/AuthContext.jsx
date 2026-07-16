import { createContext, useCallback, useEffect, useState } from 'react'
import authService from '../services/authService'
import profileService from '../services/profileService'
import { getErrorMessage } from '../api/axiosClient'

export const AuthContext = createContext(null)

const TOKEN_KEY = 'hercare_token'
const ROLE_KEY = 'hercare_role'
const USER_KEY = 'hercare_user'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY))
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  })
  const [loading, setLoading] = useState(false)

  const persistSession = (newToken, newRole, newUser) => {
    if (newToken) localStorage.setItem(TOKEN_KEY, newToken)
    if (newRole) localStorage.setItem(ROLE_KEY, newRole)
    if (newUser) localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setRole(newRole)
    setUser(newUser)
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const { data } = await authService.login({ email, password })
      persistSession(data.token, data.role, null)
      // fetch full profile after login so we have the user's name etc.
      try {
        const profileRes = await profileService.getMyProfile()
        persistSession(data.token, data.role, profileRes.data)
      } catch {
        // profile fetch is best-effort; login still succeeds without it
      }
      return { role: data.role }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const register = async (payload) => {
    setLoading(true)
    try {
      const { data } = await authService.register(payload)
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setRole(null)
    setUser(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!token) return
    try {
      const { data } = await profileService.getMyProfile()
      setUser(data)
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    } catch {
      // ignore — user stays with whatever cached data it has
    }
  }, [token])

  useEffect(() => {
    if (token && !user) {
      refreshProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const value = {
    token,
    role,
    user,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
    refreshProfile,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

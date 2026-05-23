import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginRequest } from '../services/authService'

const AUTH_STORAGE_KEY = 'medeva-auth'
const AuthContext = createContext(null)

function readAuth() {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveAuth(payload) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
}

function clearAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readAuth())

  useEffect(() => {
    if (auth) saveAuth(auth)
    else clearAuth()
  }, [auth])

  const login = useCallback(async (payload) => {
    const result = await loginRequest(payload)
    setAuth(result)
    return result
  }, [])

  const logout = useCallback(() => {
    setAuth(null)
  }, [])

  const value = useMemo(() => ({ auth, login, logout, setAuth }), [auth, login, logout])

  return createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

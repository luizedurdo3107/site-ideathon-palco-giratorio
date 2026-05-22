import { useState, useEffect } from 'react'
import { getAuthUser, type AuthUser } from './auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(getAuthUser)

  useEffect(() => {
    const sync = () => setUser(getAuthUser())
    window.addEventListener('stage_auth_change', sync)
    return () => window.removeEventListener('stage_auth_change', sync)
  }, [])

  return { user, isLoggedIn: user !== null }
}

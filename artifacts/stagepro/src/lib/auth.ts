export interface AuthUser {
  name: string
  email: string
  avatar: string
  type: 'artist' | 'client'
  location: string
  bio: string
  joinedAt: string
}

const AUTH_KEY = 'stage_auth_user'

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setAuthUser(user: AuthUser) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event('stage_auth_change'))
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_KEY)
  window.dispatchEvent(new Event('stage_auth_change'))
}

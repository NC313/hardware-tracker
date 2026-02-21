export const API_BASE = 'https://hardware-tracker-api.onrender.com'

export function saveToken(token) {
  localStorage.setItem('token', token)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function isTokenValid(token) {
  if (!token) return false
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return false
  return decoded.exp * 1000 > Date.now()
}

import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const USERS_STORAGE_KEY = 'inkwell_users'
const CURRENT_USER_KEY = 'inkwell_current_user'

const readUsersFromStorage = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(readUsersFromStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const registerUser = (data) => {
    const { name, email, password, accountType } = data || {}
    const emailExists = users.some((u) => u.email === email)
    if (emailExists) {
      return { ok: false, message: 'Email already registered' }
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      accountType,
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers))
    return { ok: true, user: newUser }
  }

  const loginUser = (data) => {
    const { email, password } = data || {}
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!matchedUser) {
      return { ok: false, message: 'Invalid email or password' }
    }

    setCurrentUser(matchedUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matchedUser))
    return { ok: true, user: matchedUser }
  }

  const logoutUser = () => {
    setCurrentUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const value = useMemo(
    () => ({
      users,
      currentUser,
      registerUser,
      loginUser,
      logoutUser,
    }),
    [users, currentUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

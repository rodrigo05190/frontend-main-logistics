import { ReactNode, createContext, memo, useEffect, useState } from 'react'

import { useApi } from '@hooks/useApi'

export const AuthContext = createContext<{
  isAuthenticated: boolean
  user: User | null
  token: string | null
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setUser: (user: User) => void
  setToken: (token: string) => void
  clearAuthData: () => void
  updateUser: () => Promise<void>
}>({
  isAuthenticated: false,
  user: null,
  token: null,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  setUser: (user: User) => {},
  setToken: (token: string) => {},
  clearAuthData: () => {},
  updateUser: async () => {},
})

export const AuthProvider = memo(({ children }: { children: ReactNode }) => {
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
  const storedUser = localStorage.getItem('user')
  const storedToken = localStorage.getItem('token')

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false
  )
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null)
  const [token, setToken] = useState<string | null>(storedToken ? JSON.parse(storedToken) : null)

  const { AdminRepository, removeAuthTokenFromApiHeader } = useApi()

  const clearAuthData = () => {
    removeAuthTokenFromApiHeader()
    setIsAuthenticated(false)
    setUser(null)
    setToken(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const updateUser = async () => {
    const response = await AdminRepository.getOneById(user!.id)

    if (response.status === 200) {
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
    } else {
      clearAuthData()
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) updateUser()
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        setIsAuthenticated,
        setUser,
        setToken,
        clearAuthData,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
})

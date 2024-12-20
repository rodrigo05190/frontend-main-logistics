import { useContext, useMemo } from 'react'
import { useApi } from '@hooks/useApi'

import { AuthContext } from '@contexts/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  const { setAuthTokenOnApiHeader, AuthRepository } = useApi()

  const handleLogin = async (data: { email: string; password: string }) => {
    const response = await AuthRepository.login(data.email, data.password)

    if (response.status === 200) {
      context.setToken(response.data)
      localStorage.setItem('token', JSON.stringify(response.data))
      context.setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', JSON.stringify(true))

      setAuthTokenOnApiHeader(response.data)
    } else {
      throw new Error('Credenciais inválidas')
    }
  }

  const handleLogout = async () => {
    await AuthRepository.logout().catch(() => {})

    context.clearAuthData()
  }

  const updateUser = async () => {
    const response = await AuthRepository.authenticate()

    if (response.status === 200) {
      context.setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
    } else {
      handleLogout()
    }
  }

  useMemo(() => {
    async function handleTokenChange() {
      if (!context.token) {
        context.clearAuthData()

        return
      }

      setAuthTokenOnApiHeader(context.token)

      await updateUser()
    }

    handleTokenChange()
  }, [context.token])

  return {
    isAuthenticated: context.isAuthenticated,
    user: context.user,
    updateUser: context.updateUser,
    token: context.token,
    handleLogin,
    handleLogout,
  }
}

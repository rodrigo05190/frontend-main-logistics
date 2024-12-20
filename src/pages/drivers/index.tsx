import React, { createContext, useEffect, useState } from 'react'

import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useApi } from '@hooks/useApi'
import { useLoading } from '@hooks/useLoading'

interface DriverContextProps {
  driver: User
  getDriver: () => Promise<void>
}

interface DriverProviderProps {
  children: React.ReactNode
}

export const DriverContext = createContext<DriverContextProps>({
  driver: {} as User,
  getDriver: async () => {},
})

export const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
  const [driver, setDriver] = useState<User>({} as User)

  const { stopLoading } = useLoading()

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { DriverRepository } = useApi()

  const getDriver = async () => {
    if (!id) {
      navigate('/drivers')

      return
    }

    const response = await DriverRepository.getOneById(id)

    setDriver(response.data)

    stopLoading()
  }

  useEffect(() => {
    getDriver()
  }, [pathname])

  return <DriverContext.Provider value={{ driver, getDriver }}>{children}</DriverContext.Provider>
}

import React, { createContext, useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { useLoading } from '../../hooks/useLoading'

interface TruckContextProps {
  truck: Truck
  getTruck: () => Promise<void>
}

interface TruckProviderProps {
  children: React.ReactNode
}

export const TruckContext = createContext<TruckContextProps>({
  truck: {} as Truck,
  getTruck: async () => {},
})

export const TruckProvider: React.FC<TruckProviderProps> = ({ children }) => {
  const [truck, setTruck] = useState<Truck>({} as Truck)

  const { stopLoading } = useLoading()

  const { pathname } = useLocation()

  const { id } = useParams<{ id: string }>()

  const { TruckRepository } = useApi()

  const getTruck = async () => {
    if (!id) return

    const response = await TruckRepository.getOneById(id)

    setTruck(response.data)

    stopLoading()
  }

  useEffect(() => {
    getTruck()
  }, [pathname])

  return <TruckContext.Provider value={{ truck, getTruck }}>{children}</TruckContext.Provider>
}

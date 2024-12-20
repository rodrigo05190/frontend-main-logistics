import React, { createContext, useLayoutEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

interface LoadingContextProps {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  setIsLoading: (value: boolean) => {},
})

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()

  useLayoutEffect(() => {
    setIsLoading(true)
  }, [location.pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

import React from 'react'

import { LoadingContext } from '../contexts/LoadingContext'

export const useLoading = () => {
  const { isLoading, setIsLoading } = React.useContext(LoadingContext)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return { isLoading, startLoading, stopLoading }
}

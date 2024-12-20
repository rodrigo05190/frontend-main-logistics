import React, { useContext } from 'react'

import { AlertContext } from '../contexts/AlertContext'

export const useAlert = () => {
  const { setVisible, setMessage, setType, visible } = useContext(AlertContext)

  const triggerAlert = (
    type: 'success' | 'error' | 'warning',
    message: React.ReactNode,
    afterTimeout?: () => void
  ) => {
    setVisible(true)
    setType(type)
    setMessage(message)
    if (afterTimeout)
      setTimeout(() => {
        afterTimeout()
      }, 5000)
  }

  return { triggerAlert }
}

import React, { createContext, useEffect, useState } from 'react'

import Alert from '../components/Alert'

interface AlertContextProps {
  setMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>
  setType: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning'>>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
}

interface AlertProviderProps {
  children: React.ReactNode
}

export const AlertContext = createContext({} as AlertContextProps)

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<React.ReactNode>('')
  const [type, setType] = useState<'success' | 'error' | 'warning'>('success')
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (visible)
      setTimeout(() => {
        document.getElementById('alert')!.style.animation = 'slideOut 0.3s linear'
        setTimeout(() => {
          setVisible(false)
        }, 300)
      }, 5000)
  }, [visible])

  return (
    <AlertContext.Provider value={{ setMessage, setType, setVisible, visible }}>
      {visible && <Alert message={message} type={type} />}
      {children}
    </AlertContext.Provider>
  )
}

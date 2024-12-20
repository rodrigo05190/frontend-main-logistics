import React, { useContext, useEffect } from 'react'

import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '../../hooks/useAlert'

const Logout: React.FC = () => {
  const { handleLogout } = useAuth()

  const navigate = useNavigate()

  const { triggerAlert } = useAlert()

  useEffect(() => {
    handleLogout()
      .then(() => {
        navigate('/login')
        triggerAlert('success', 'Sessão encerrada com sucesso!')
      })
      .catch(() => {
        triggerAlert('error', 'Erro ao encerrar sessão!')
      })
  }, [])

  return <div />
}

export default Logout

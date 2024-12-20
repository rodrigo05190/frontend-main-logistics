import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

interface PrivateProps {
  children: React.ReactElement<any, any> | null
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  return isAuthenticated ? children : null
}

export default Private

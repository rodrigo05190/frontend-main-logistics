import React, { ReactNode, useContext, useEffect } from 'react'
import * as C from './styles'

import theme from '../../theme'

import Divider from '../Divider'
import Text from '../Text'

import { Logo } from '../../assets/Icons'

import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@hooks/useAuth'

import AuthBackground from '../../assets/images/auth-background.jpg'

interface AuthLayoutProps {
  title?: string
  subtitle?: string
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const { isAuthenticated } = useAuth()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <C.GridContainer>
      <C.LeftContainer>
        <C.Image src={AuthBackground} />
      </C.LeftContainer>
      <C.RightContainer>
        <C.RightContainerHeader>
          <C.CloseButton onClick={() => navigate('/login')} invisible={pathname === '/login'}>
            <Text alignCenter fontSize="24px">
              &times;
            </Text>
          </C.CloseButton>
        </C.RightContainerHeader>
        <C.LogoContainer>
          <Logo />
        </C.LogoContainer>
        <C.RightContainerBody>
          <C.TitleContainer>
            <Text fontSize="25px" fontWeight="700" color={theme.colors.black.main}>
              {title}
            </Text>
            <Divider type="horizontal" invisible spaced />
            <Text fontSize="12px" fontWeight="700">
              {subtitle}
            </Text>
          </C.TitleContainer>
          <Divider type="horizontal" invisible spaced />
          <Divider type="horizontal" invisible spaced />
          <Divider type="horizontal" invisible spaced />
          {children}
        </C.RightContainerBody>
      </C.RightContainer>
    </C.GridContainer>
  )
}

export default AuthLayout

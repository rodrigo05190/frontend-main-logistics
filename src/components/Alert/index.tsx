import React from 'react'

import Text from '../Text'
import * as C from './styles'

import theme from '../../theme'

interface AlertProps {
  message?: React.ReactNode
  type: 'success' | 'error' | 'warning'
  handleClose?: () => void
}

const Alert: React.FC<AlertProps> = ({ message, type, handleClose }) => {
  return (
    <C.Container className={type} id="alert">
      <C.TextContainer>
        <Text color={theme.colors.white.main} fontSize="14px">
          {message}
        </Text>
      </C.TextContainer>
      <C.TimeOutBar />
    </C.Container>
  )
}

export default Alert

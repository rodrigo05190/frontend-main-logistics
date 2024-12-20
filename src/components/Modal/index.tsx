import React from 'react'

import theme from '../../theme'

import Button from '../Button'
import Text from '../Text'
import * as C from './styles'
import { width } from 'styled-system'

interface ModalProps {
  children?: React.ReactNode
  title?: string
  handleClose?: () => void
  height?: string
  width?: string
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <C.Background>
      <C.Container height={props.height} width={props.width}>
        <C.Header>
          <Text noSelect color={theme.colors.black.main} fontSize="25px" fontWeight="700">
            {props.title}
          </Text>
        </C.Header>
        <C.Close>
          <Button onClick={props.handleClose} background="none" height="40px" width="40px">
            <Text color={theme.colors.black.main} fontSize="48px" fontWeight="300">
              &times;
            </Text>
          </Button>
        </C.Close>
        <C.Content>{props.children}</C.Content>
      </C.Container>
    </C.Background>
  )
}

export default Modal

import React from 'react'

import LoadingSpinner from '../LoadingSpinner'
import * as C from './styles'

interface ButtonProps {
  background?: string
  border?: string
  borderRadius?: string
  className?: string
  color?: string
  darkHover?: boolean
  disabled?: boolean
  fontSize?: string
  fontWeight?: string
  gap?: string
  justifyContent?: string
  lightHover?: boolean
  loading?: boolean
  noHover?: boolean
  padding?: string
  type?: 'button' | 'submit'
  height?: string
  width?: string
  children?: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <C.Container {...props}>
      <C.ChildrenContainer gap={props.gap} justifyContent={props.justifyContent}>
        {props.loading ? <LoadingSpinner /> : props.children}
      </C.ChildrenContainer>
    </C.Container>
  )
}

export default Button

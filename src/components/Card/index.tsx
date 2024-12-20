import { FC, ReactNode } from 'react'

import * as C from './styles'

interface CardProps {
  bordered?: boolean
  description?: string
  disabled?: boolean
  disabledComponent?: ReactNode
  icon?: ReactNode
  title?: string
  onClick?: () => void
}

const Card: FC<CardProps> = (props) => {
  return (
    <C.Container onClick={props.onClick}>
      <C.Icon className={`icon ${props.bordered ? 'bordered' : ''}`}>{props.icon}</C.Icon>
      <C.Title>{props.title}</C.Title>
      <C.Description>{props.disabled ? props.disabledComponent : props.description}</C.Description>
    </C.Container>
  )
}

export default Card

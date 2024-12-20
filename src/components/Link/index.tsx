import React from 'react'

import * as C from './styles'

interface ContainerProps {
  color?: string
  className?: string
  fontSize?: string
  fontWeight?: string
  margin?: string
  textDecoration?: string
  to: string
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {
  return <C.Container {...props}>{props.children}</C.Container>
}

export default Container

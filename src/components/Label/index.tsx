import React from 'react'

import * as C from './styles'

interface LabelProps {
  color?: string
  fontSize?: string
  fontWeight?: string
  padding?: string
  htmlFor?: string
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = (props) => {
  return <C.Container {...props}>{props.children}</C.Container>
}

export default Label

import React from 'react'

import * as C from './styles'

interface BoxProps {
  children: React.ReactNode
  align?: string
  alignSelf?: string
  background?: string
  border?: string
  borderRadius?: string
  flexDirection?: string
  flexWrap?: string
  gap?: string
  id?: string
  justify?: string
  margin?: string
  maxHeight?: string
  maxWidth?: string
  padding?: string
  height?: string
  width?: string
}

const Box: React.FC<BoxProps> = (props) => {
  return <C.Container {...props}>{props.children}</C.Container>
}

export default Box

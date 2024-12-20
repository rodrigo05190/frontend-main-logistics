import React from 'react'

import * as C from './styles'

interface TextProps {
  alignCenter?: boolean
  alignSelf?: string
  className?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  id?: string
  lineHeight?: string
  margin?: string
  noSelect?: boolean
  textDecoration?: string
  transition?: string
  children?: React.ReactNode
}

const Text: React.FC<TextProps> = (props) => {
  return <C.Container {...props}>{props.children}</C.Container>
}

export default Text

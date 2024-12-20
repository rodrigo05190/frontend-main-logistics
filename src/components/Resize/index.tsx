import React from 'react'

import * as C from './styles'

interface ResizeProps {
  children: React.ReactNode
  padding?: string
  height?: string
  width?: string
}

const Resize: React.FC<ResizeProps> = (props) => (
  <C.Container {...props}>{props.children}</C.Container>
)

export default Resize

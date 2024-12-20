import React from 'react'

import * as C from './styles'

interface DividerProps {
  type?: 'horizontal' | 'vertical'
  invisible?: boolean
  spaced?: boolean
}

const Divider: React.FC<DividerProps> = (props) => {
  return props.type === 'horizontal' ? (
    <C.HorizontalDivider {...props} />
  ) : (
    <C.VerticalDivider {...props} />
  )
}

export default Divider

import React from 'react'

import Box from '../Box'
import Divider from '../Divider'
import Text from '../Text'

interface ReadOnlyProps {
  fullWidth?: boolean
  label?: string
  value?: string
}

const ReadOnly: React.FC<ReadOnlyProps> = (props) => {
  return (
    <Box
      align="start"
      background="transparent"
      margin={props.fullWidth ? '-20px 0 0 0' : '0'}
      padding="0"
      width="100%"
    >
      <Text>
        {props.label}: {props.value}
      </Text>
      <Divider spaced type="horizontal" />
    </Box>
  )
}

export default ReadOnly

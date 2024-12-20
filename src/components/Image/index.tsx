import React, { useState } from 'react'

import LoadingSpinner from '../LoadingSpinner'
import * as C from './styles'

interface ImageProps {
  border?: string
  borderRadius?: string
  boxShadow?: string
  maxHeight?: string
  objectFit?: string
  src: string
}

const Image: React.FC<ImageProps> = (props) => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingSpinner />}
      <C.Container
        id="image"
        border={props.border}
        borderRadius={props.borderRadius}
        boxShadow={props.boxShadow}
        maxHeight={props.maxHeight}
        style={{ display: loading ? 'none' : 'block' }}
        objectFit={props.objectFit}
        src={props.src}
        onLoad={() => setLoading(false)}
      />
    </>
  )
}

export default Image

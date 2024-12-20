import React, { useEffect } from 'react'

import * as C from './styles'

const PageLoading: React.FC = () => {
  useEffect(() => {
    const circles = [
      document.getElementById('first-circle'),
      document.getElementById('second-circle'),
      document.getElementById('third-circle'),
    ]

    setTimeout(() => {
      circles.map((circle, index) => {
        circle?.style.setProperty('display', 'unset')
        setTimeout(() => {
          circle?.style.setProperty('animation', 'circle 1s linear infinite')
        }, index * 0.8 * 333)
      })
    }, 300)
  }, [])

  return (
    <C.Container>
      <C.Circle id="first-circle" />
      <C.Circle id="second-circle" />
      <C.Circle id="third-circle" />
    </C.Container>
  )
}

export default PageLoading

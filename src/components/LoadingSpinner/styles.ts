import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
`

export const Spinner = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 24px;
  height: 24px;
  border: 3px solid ${theme.colors.white.main};
  border-top: 3px solid ${theme.colors.gray.dark};
  border-radius: 50%;
  animation: spinner 0.8s linear infinite;
`

import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.div`
  align-content: flex-end;
  display: grid;
  grid-template-columns: 80px 80px 80px;
  grid-template-rows: 80px;
  justify-content: center;

  height: 200px;
  width: 100%;
`

export const Circle = styled.div`
  @keyframes circle {
    0% {
      background: ${theme.colors.red.light};

      height: 30%;
      width: 30%;
    }
    25% {
      background: ${theme.colors.red.light};

      height: 30%;
      width: 30%;
    }
    50% {
      background: ${theme.colors.red.main};

      height: 80%;
      width: 80%;
    }
    80% {
      background: ${theme.colors.red.light};

      height: 30%;
      width: 30%;
    }
  }

  align-self: center;
  background: ${theme.colors.red.light};
  border-radius: 50%;
  display: none;
  justify-self: center;

  height: 30%;
  width: 30%;
`

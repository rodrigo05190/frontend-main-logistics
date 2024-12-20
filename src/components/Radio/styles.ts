import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  position: relative;

  width: 100%;
`

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`

export const RadioItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
`

export const Error = styled.span`
  color: ${theme.colors.red.main};
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`

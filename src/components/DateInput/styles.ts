import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.input`
  background: ${theme.colors.white.main};
  border: 1px solid ${theme.colors.gray.border};
  border-radius: 10px;
  color: ${theme.colors.gray.text};
  cursor: pointer;
  font-size: 16px;
  padding: 0 20px;

  height: 50px;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  &::-webkit-calendar-picker-indicator:hover {
    scale: 130%;
  }
`

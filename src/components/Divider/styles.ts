import styled from 'styled-components'

import theme from '../../theme'

interface DividerProps {
  invisible?: boolean
  spaced?: boolean
}

export const VerticalDivider = styled.div`
  background: ${theme.colors.gray.border + '52'};
  margin: ${(props: DividerProps) => (props.spaced ? '0 5px' : '0')};

  height: 100%;
  width: ${(props: DividerProps) => (props.invisible ? '0' : '1px')};
`

export const HorizontalDivider = styled.div`
  background: ${theme.colors.gray.border + '52'};
  margin: ${(props: DividerProps) => (props.spaced ? '5px 0' : '0')};

  height: ${(props: DividerProps) => (props.invisible ? '0' : '1px')};
  width: 100%;
`

import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  color?: string
  fontSize?: string
  fontWeight?: string
  padding?: string
}

export const Container = styled.label<ContainerProps>`
  align-items: center;
  display: flex;

  color: ${(props: ContainerProps) => props.color || theme.colors.black.dark};
  font-size: ${(props: ContainerProps) => props.fontSize || '15px'};
  font-weight: ${(props: ContainerProps) => props.fontWeight || '300'};
  padding: ${(props: ContainerProps) => props.padding || '0'};
`

import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  align?: string
  alignSelf?: string
  background?: string
  border?: string
  borderRadius?: string
  flexDirection?: string
  flexWrap?: string
  gap?: string
  justify?: string
  margin?: string
  maxHeight?: string
  maxWidth?: string
  padding?: string
  height?: string
  width?: string
}

export const Container = styled.div`
  align-items: ${(props: ContainerProps) => props.align || 'center'};
  align-self: ${(props: ContainerProps) => props.alignSelf || 'center'};
  background: ${(props: ContainerProps) => props.background || theme.colors.white.main};
  border: ${(props: ContainerProps) => props.border || 'none'};
  border-radius: ${(props: ContainerProps) => props.borderRadius || '10px'};
  display: flex;
  flex-direction: ${(props: ContainerProps) => props.flexDirection || 'column'};
  flex-wrap: ${(props: ContainerProps) => props.flexWrap || 'unset'};
  gap: ${(props: ContainerProps) => props.gap || '0'};
  justify-content: ${(props: ContainerProps) => props.justify || 'center'};
  margin: ${(props: ContainerProps) => props.margin || '0'};
  padding: ${(props: ContainerProps) => props.padding || '20px'};
  transition: all 0.2s ease-in-out;

  max-height: ${(props: ContainerProps) => props.maxHeight || 'auto'};
  max-width: ${(props: ContainerProps) => props.maxWidth || 'auto'};

  height: ${(props: ContainerProps) => props.height || 'auto'};
  width: ${(props: ContainerProps) => props.width || 'auto'};
`

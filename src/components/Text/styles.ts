import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  alignCenter?: boolean
  alignSelf?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  margin?: string
  noSelect?: boolean
  textDecoration?: string
  transition?: string
}

export const Container = styled.p<ContainerProps>`
  align-items: center;
  align-self: ${(props) => props.alignSelf || 'unset'};
  color: ${(props) => props.color || theme.colors.gray.text};
  display: flex;
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: ${(props) => props.fontWeight || '500'};
  gap: 5px;
  justify-content: ${(props) => (props.alignCenter ? 'center' : 'unset')};
  line-height: ${(props) => props.lineHeight || 'auto'};
  margin: ${(props) => props.margin || '0'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
  text-align: ${(props) => (props.alignCenter ? 'center' : 'unset')};
  transition: ${(props) => props.transition || 'all 0.3s ease-in-out'};
  user-select: ${(props) => (props.noSelect ? 'none' : 'unset')};
`

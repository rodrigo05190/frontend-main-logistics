import styled from 'styled-components'

import { Link } from 'react-router-dom'

import theme from '../../theme'

interface ContainerProps {
  color?: string
  fontSize?: string
  fontWeight?: string
  margin?: string
  textDecoration?: string
}

export const Container = styled(Link)<ContainerProps>`
  align-items: center;
  background: transparent;
  border: none;
  color: ${(props) => props.color || theme.colors.gray.text};
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: ${(props) => props.fontWeight || '500'};
  margin: ${(props) => props.margin || '0 auto'};
  text-decoration: ${(props) => props.textDecoration || 'none'};
  transition: opacity 0.2s;
`

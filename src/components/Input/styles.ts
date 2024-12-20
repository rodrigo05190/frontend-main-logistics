import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  width?: string
}

interface InputProps {
  background?: string
  border?: string
  borderRadius?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  noSpace?: boolean
  paddingInlineEnd?: string
  paddingInlineStart?: string
  placeholderColor?: string
  height?: string
}

interface IconProps {
  iconOnRight?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  width: ${(props: ContainerProps) => props.width || '100%'};
`

export const Input = styled.input<InputProps>`
  background: ${(props) => props.background || theme.colors.white.main};
  border: ${(props) => props.border || `1px solid ${theme.colors.gray.border}`};
  border-radius: ${(props) => props.borderRadius || '5px'};
  color: ${(props) => props.color || theme.colors.black.main};
  font-size: ${(props) => props.fontSize || '15px'};
  font-weight: ${(props) => props.fontWeight || '500'};
  margin-bottom: ${(props) => (props.noSpace ? '0' : '8px')};
  margin-top: ${(props) => (props.noSpace ? '0' : '8px')};
  padding-inline-end: ${(props) => props.paddingInlineEnd || '16px'};
  padding-inline-start: ${(props) => props.paddingInlineStart || '16px'};
  position: relative;

  height: ${(props) => props.height || '50px'};
  width: 100%;

  &::placeholder {
    color: ${(props) => props.placeholderColor || theme.colors.gray.light};
  }
`
export const Icon = styled.div<IconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: ${(props) => (props.iconOnRight ? 'auto' : '5px')};
  margin-right: ${(props) => (props.iconOnRight ? '5px' : 'auto')};
  position: absolute;
  padding-bottom: 5px;

  left: 0;
  right: 0;
  height: 50px;
  width: 50px;
  z-index: 1;
`

export const Error = styled.span`
  color: ${theme.colors.red.main};
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`

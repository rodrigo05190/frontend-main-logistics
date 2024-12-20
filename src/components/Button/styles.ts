import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  background?: string
  border?: string
  borderRadius?: string
  color?: string
  darkHover?: boolean
  disabled?: boolean
  fontSize?: string
  fontWeight?: string
  lightHover?: boolean
  noHover?: boolean
  padding?: string
  height?: string
  width?: string
}

interface ChildrenContainerProps {
  gap?: string
  justifyContent?: string
}

export const Container = styled.button<ContainerProps>`
  align-items: center;
  background: ${(props) => props.background || theme.colors.red.main};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || '5px'};
  color: ${(props) => props.color || theme.colors.white.main};
  cursor: pointer;
  display: flex;
  gap: 15px;
  font-size: ${(props) => props.fontSize || '18px'};
  font-weight: ${(props) => props.fontWeight || '500'};
  justify-content: center;
  padding: ${(props) => props.padding || '0'};
  position: relative;
  transition: all 0.2s ease-in-out;
  user-select: none;

  height: ${(props) => props.height || '50px'};
  width: ${(props) => props.width || '100%'};

  ${(props) =>
    props.disabled &&
    `background: ${theme.colors.gray.border} important!; cursor: not-allowed; opacity: 0.5;`}

  &::before {
    background-color: ${(props) =>
      props.darkHover
        ? 'rgba(0, 0, 0, 0.4)'
        : props.lightHover
        ? 'rgba(0, 0, 0, 0.06)'
        : 'rgba(0, 0, 0, 0.12)'};

    border-radius: ${(props) => props.borderRadius || '5px'};
    content: '';
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease;

    left: 0;
    top: 0;

    height: 100%;
    width: 100%;
  }

  &:hover::before {
    opacity: ${(props) => (props.noHover ? '0' : '1')};
  }
`

export const ChildrenContainer = styled.div<ChildrenContainerProps>`
  align-items: center;
  display: flex;
  gap: ${(props) => props.gap || '15px'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  transition: all 0.3s ease-in-out;

  width: 100%;
  z-index: 1;
`

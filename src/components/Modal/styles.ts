import styled from 'styled-components'

import theme from '../../theme'

interface ContainerProps {
  border?: string
  borderRadius?: string
  height?: string
  width?: string
}

export const Background = styled.div`
  align-items: end;
  background-color: ${theme.colors.black.main}cc;
  display: flex;
  position: absolute;

  left: 0;
  top: 0;

  height: 100%;
  width: 100%;
  z-index: 997;
  overflow-y: auto;
`

export const Container = styled.div<ContainerProps>`
  background: ${theme.colors.white.main};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.borderRadius || '10px'};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-areas: 'header close' 'content content';
  grid-template-columns: 1fr 40px;
  grid-template-rows: 40px 1fr;
  margin: 0 auto 0 auto;
  padding: 20px;
  position: absolute;

  left: 0;
  right: 0;
  top: 100px;
  bottom: 100px;

  height: ${(props) => props.height || '600px'};
  width: ${(props) => props.width || '160px'};
  z-index: 998;
`

export const Header = styled.div`
  grid-area: header;

  align-items: center;
  display: flex;
  justify-content: start;
  padding-left: 10px;
`

export const Close = styled.div`
  grid-area: close;

  align-items: start;
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  grid-area: content;

  align-items: center;
  display: flex;
  justify-content: center;

  overflow-y: auto;
`

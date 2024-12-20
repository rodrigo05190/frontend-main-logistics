import styled from 'styled-components'

interface ContainerProps {
  align?: string
  background?: string
  height?: string
  width?: string
}

export const Container = styled.form<ContainerProps>`
  align-items: ${(props) => props.align || 'unset'};
  background: ${(props) => props.background || 'transparent'};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
`

export const GridContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 40px;

  width: 100%;
`

export const Footer = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 40px;
`

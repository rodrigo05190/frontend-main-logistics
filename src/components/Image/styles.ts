import styled from 'styled-components'

interface ContainerProps {
  border?: string
  borderRadius?: string
  boxShadow?: string
  maxHeight?: string
  objectFit?: string
}

export const Container = styled.img<ContainerProps>`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.boxShadow};
  max-height: ${(props) => props.maxHeight};
  object-fit: ${(props) => props.objectFit};

  height: 100%;
  width: auto;
`

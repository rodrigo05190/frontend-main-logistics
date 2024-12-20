import styled from 'styled-components'

interface ContainerProps {
  padding?: string
  height?: string
  width?: string
}

export const Container = styled.div`
  padding: ${(props: ContainerProps) => props.padding || '0'};

  height: ${(props: ContainerProps) => props.height || 'auto'};
  width: ${(props: ContainerProps) => props.width || 'auto'};

  & > * {
    height: 100%;
    width: 100%;
  }
`

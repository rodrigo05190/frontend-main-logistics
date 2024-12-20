import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 25px;
  grid-template-areas: 'input label';
  grid-template-columns: 150px 1fr;
  justify-content: center;
  position: relative;
  margin: auto;
`

export const DropContainer = styled.div`
  grid-area: input;

  align-items: center;
  border-radius: 50%;
  background: ${theme.colors.gray.light};
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  width: 150px;
`

export const Preview = styled.img`
  border-radius: 50%;
  object-fit: cover;

  height: 100%;
  width: 100%;
`

export const CameraContainer = styled.div`
  grid-area: input;

  align-items: center;
  background: ${theme.colors.white.main};
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  width: 40px;
  bottom: 0;
  right: 0;
`

export const Label = styled.label`
  grid-area: label;

  align-items: center;
  display: flex;
  justify-content: start;
`

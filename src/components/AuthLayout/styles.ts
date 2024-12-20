import styled from 'styled-components'

import theme from '../../theme'

interface CloseButtonProps {
  invisible?: boolean
}

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;

  height: 100%;
  width: 100%;
`

export const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  grid-column: 1 / 2;
  justify-content: center;
  position: relative;

  height: 100%;
  width: 100%;
`

export const Image = styled.img`
  object-fit: cover;
  position: absolute;

  height: 100%;
  width: 100%;
`

export const RightContainer = styled.div`
  align-items: center;
  display: grid;
  grid-column: 2 / 3;
  grid-template-rows: 80px 50px 1fr;

  overflow: auto;

  height: 100%;
  width: 100%;
`

export const RightContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3 / 4;
  margin-bottom: 80px;
  margin-top: 20px;
  padding: 0 80px;
`

export const RightContainerHeader = styled.div`
  align-items: center;
  align-self: start;
  display: flex;
  grid-row: 1 / 2;
  justify-content: end;
  padding: 20px;

  height: 80px;
  width: 100%;
`

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  grid-row: 2 / 3;
  justify-content: center;

  height: 50px;
  width: 100%;
`

export const CloseButton = styled.button<CloseButtonProps>`
  background: none;
  border: 1px solid ${theme.colors.gray.border};
  border-radius: 50%;
  cursor: pointer;
  visibility: ${(props) => (props.invisible ? 'hidden' : 'visible')};
  transition: all 0.3s ease-in-out;
  user-select: none;

  height: 40px;
  width: 40px;

  &:hover {
    border: 1px solid ${theme.colors.gray.dark};

    & > p {
      color: ${theme.colors.gray.dark};
    }
  }
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

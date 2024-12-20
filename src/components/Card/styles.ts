import styled from 'styled-components'

import theme from '../../theme'

export const Container = styled.div`
  align-items: center;
  background: ${theme.colors.white.main};
  border-radius: 12px;
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-template-areas: 'icon title' 'icon content';
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
  transition: all 0.3s;

  height: 164px;
  width: 328px;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  &:not(:hover) {
    & > .icon.bordered::after {
      height: 164px;
    }
  }
`

export const Title = styled.p`
  grid-area: title;

  align-items: end;
  display: flex;
  font-size: 18px;
  font-weight: 700;
  gap: 6px;
  justify-content: space-between;

  height: 100%;
  width: 100%;
`

export const Description = styled.span`
  grid-area: content;

  align-items: start;
  color: ${theme.colors.gray.text};
  display: flex;
  font-size: 12px;
  font-weight: 500;
  justify-content: flex-start;

  height: 100%;
  width: 100%;
`

export const Icon = styled.div`
  grid-area: icon;

  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  transition: all 0.3s;

  height: 112px;
  width: 112px;

  &.bordered {
    border: 8px solid ${theme.colors.orange.main};
  }

  &.bordered::after {
    background: ${theme.colors.white.main};
    border-radius: 10%;
    content: '';
    margin-right: 56px;
    position: absolute;
    transition: all 0.3s ease-in-out;

    height: 0;
    width: 56px;
    z-index: 0;
  }

  &:not(.bordered) > svg {
    height: 80%;
    width: 80%;
  }

  & > svg {
    height: 50%;
    width: 50%;
    z-index: 1;
  }
`

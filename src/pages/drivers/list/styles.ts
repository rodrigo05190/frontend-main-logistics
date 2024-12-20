import styled from 'styled-components'

export const Container = styled.div`
  align-items: flex-start;
  display: grid;
  grid-template-areas: 'header' 'filters' 'content';
  grid-template-rows: 50px auto 1fr;
  justify-content: start;

  width: 100%;
`

export const Header = styled.div`
  grid-area: header;

  align-items: center;
  display: flex;
  justify-content: space-between;

  height: 50px;
`

export const FiltersContainer = styled.div`
  grid-area: filters;

  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: start;
  padding: 10px 0;

  & > button:not(:hover) {
    padding-right: 0;

    & > div {
      gap: 0;

      & > .close {
        opacity: 0;
      }
    }
  }
`

export const CardsContainer = styled.div`
  grid-area: content;

  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 328px);

  height: 100%;

  @media (min-width: 1800px) {
    grid-template-columns: repeat(4, 328px);
  }
`

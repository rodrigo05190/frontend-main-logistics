import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'header' 'divider' 'content';
  grid-template-columns: 1fr;
  grid-template-rows: 50px 20px 1fr;

  width: 100%;
`

export const PageHeader = styled.div`
  grid-area: header;

  align-items: end;
  display: flex;
  justify-content: space-between;

  width: auto;

  & > button.back {
    &:hover {
      & > div > div {
        padding-right: 10px;
      }
    }
  }
`

export const PageTitle = styled.h1`
  align-items: flex-start;
  color: #5a5e7c;
  display: flex;
  font-size: 18px;
  font-weight: 300;
  justify-content: space-between;
`

export const Content = styled.div`
  grid-area: content;

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
`

export const HiddenContent = styled.div`
  opacity: 0;
`

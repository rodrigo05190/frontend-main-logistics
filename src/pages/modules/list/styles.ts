import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 40px 40px auto;

  height: 100%;
  width: 100%;
`

export const BoxHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  height: 30px;
  width: 100%;
`

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;

  width: 100%;
`

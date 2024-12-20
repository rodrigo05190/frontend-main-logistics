import styled from 'styled-components'
import theme from '../../theme'

export const Container = styled.div`
  @keyframes slideIn {
    0% {
      top: -100px;
    }

    100% {
      top: 20px;
    }
  }

  @keyframes slideOut {
    0% {
      top: 20px;
    }

    100% {
      top: -100px;
    }
  }

  border-radius: 6px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-areas: 'text' 'timeout';
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 4px;
  flex-wrap: nowrap;
  margin: 0 auto 0 auto;
  padding: 10px;
  position: absolute;

  left: 0;
  right: 0;
  top: 20px;

  height: auto;
  width: 500px;
  z-index: 999;

  animation: slideIn 0.3s linear;

  &.error {
    background-color: ${theme.colors.red.main};
    color: ${theme.colors.gray.light};
  }

  &.success {
    background-color: ${theme.colors.green.main};
    color: ${theme.colors.gray.light};
  }

  &.warning {
    background-color: ${theme.colors.yellow.main};
    color: ${theme.colors.gray.light};
  }
`

export const TextContainer = styled.div`
  grid-area: text;

  align-items: center;
  display: flex;
  justify-content: center;
  padding: 5px 10px;
`

export const TimeOutBar = styled.div`
  @keyframes timeout {
    0% {
      width: 0;
    }

    99% {
      border-radius: 0 0 0 6px;
      width: 103%;
    }

    100% {
      border-radius: 0 6px;
      width: 104.5%;
    }
  }

  grid-area: timeout;

  background-color: ${theme.colors.white.main};
  border-radius: 0 6px;

  margin-left: -10px;
  margin-top: 10px;

  height: 4px;
  width: 104.5%;

  animation: timeout 5s linear;
`

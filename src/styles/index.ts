import { createGlobalStyle } from 'styled-components'
import theme from '../theme'

const GlobalStyle = createGlobalStyle`
  * {
    border: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.16px;
    margin: 0;
    outline: none !important;
    padding: 0;

    ::before,
    ::after {
      box-sizing: inherit;
    }

    ::selection {
      background-color: ${theme.colors.gray.dark};
      color: ${theme.colors.white.main};
    }

    ::-webkit-scrollbar {
    width: 8px;

    &-track {
      background: ${theme.colors.gray.light};
    }

    &-thumb {
      background: ${theme.colors.gray.text};

      border-radius: 4px;
    }
  }
  }

  #root {
    height: 100%;
  }

  label {
    font-size: 15px;  
    font-weight: 300; 
    line-height: 20px;
    user-select: none;
  }

  body,
  html {
    background-color: ${theme.colors.white.main};
    color: ${theme.colors.black.main};
    font-size: 16px;
    line-height: 24px;
    -webkit-font-smoothing: antialiased;

    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  textarea {
    resize: none;
  }
`

export default GlobalStyle

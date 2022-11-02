import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    min-width: 1280px;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`

import { createGlobalStyle, css } from "styled-components"
import { bodyFontProperties } from "../variables/fonts"

const style = css`
  @font-face {
    font-family: "Lexend Exa";
    font-style: normal;
    font-weight: 400;
    src: local("Lexend Exa Regular"), local("LexendExa-Regular"),
      url("../../assets/fonts/lexend-exa-v1-latin-regular.woff2")
        format("woff2"),
      url("../../assets/fonts/lexend-exa-v1-latin-regular.woff") format("woff");
  }

  html {
    font-size: 10px;
  }

  body {
    background: #fff;
    margin: 0;
    font-size: 1.6rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${bodyFontProperties};
    margin: 0;
  }

  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
`

const GlobalStyle = createGlobalStyle`${style}`

export default GlobalStyle

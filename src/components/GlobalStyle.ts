import { createGlobalStyle, css } from "styled-components"
import lexendExaRegularWoff from "../../assets/fonts/lexend-exa-v1-latin/lexend-exa-v1-latin-regular.woff"
import lexendExaRegularWoff2 from "../../assets/fonts/lexend-exa-v1-latin/lexend-exa-v1-latin-regular.woff2"
import { backgroundColor, brandColor, textColor } from "../variables/colors"
import { bodyFontProperties } from "../variables/fonts"
import {
  baseFontSize,
  h1FontSize,
  h2FontSize,
  h3FontSize,
} from "../variables/fontSizes"
import { mediaLg, mediaMd, mediaSm } from "../variables/mediaQueries"

const style = css`
  @font-face {
    font-family: "Lexend Exa";
    font-style: normal;
    font-weight: 400;
    src: local("Lexend Exa Regular"), local("LexendExa-Regular"),
      url(${lexendExaRegularWoff2}) format("woff2"),
      url(${lexendExaRegularWoff}) format("woff");
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 8px;

    ${mediaSm} {
      font-size: 9px;
    }
    ${mediaMd} {
      font-size: 9.5px;
    }
    ${mediaLg} {
      font-size: 10px;
    }
  }

  body {
    ${bodyFontProperties};
    ${baseFontSize};
    background: ${backgroundColor};
    color: ${textColor};
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol {
    margin: 0;
  }

  h1 {
    ${h1FontSize};
  }
  h2 {
    ${h2FontSize};
  }
  h3 {
    ${h3FontSize};
  }

  a {
    color: ${brandColor};
    text-decoration: none;
  }
`

const GlobalStyle = createGlobalStyle`${style}`

export default GlobalStyle

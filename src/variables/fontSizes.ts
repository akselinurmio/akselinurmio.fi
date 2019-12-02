import { css } from "styled-components"
import { mediaMd, mediaLg } from "./mediaQueries"

export const baseFontSize = css`
  font-size: 2.2rem;
`

export const largerTextFontSize = css`
  font-size: 2.6rem;
  ${mediaMd} {
    font-size: 3rem;
  }
  ${mediaLg} {
    font-size: 3.2rem;
  }
`

export const h1FontSize = css`
  font-size: 1.45em;
`

export const h2FontSize = css`
  font-size: 1.3em;
`

export const h3FontSize = css`
  font-size: 1.14em;
`

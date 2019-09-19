import { css } from "styled-components"
import { mediaSm, mediaLg, mediaXl } from "./mediaQueries"

export const baseFontSize = css`
  font-size: 2.2rem;

  ${mediaSm} {
    font-size: 2.6rem;
  }
  ${mediaLg} {
    font-size: 3.6rem;
  }
  ${mediaXl} {
    font-size: 4rem;
  }
`
export const h1FontSize = css`
  font-size: 4rem;
`
export const h2FontSize = css`
  font-size: 3rem;
`
export const h3FontSize = css`
  font-size: 2.5rem;
`

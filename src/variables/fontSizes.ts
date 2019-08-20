import { css } from "styled-components"
import { mediaLg } from "./mediaQueries"

export const base = css`
  font-size: 2rem;

  ${mediaLg} {
    font-size: 2.2rem;
  }
`

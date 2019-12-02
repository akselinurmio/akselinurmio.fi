import styled from "styled-components"
import { brandColor } from "../variables/colors"
import { mediaLg } from "../variables/mediaQueries"

const TextWithMarginLine = styled.span`
  display: block;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0.809em;
    right: 105%;
    right: calc(100% + 1.5rem);
    width: 100%;
    width: 50vw;
    height: 2px;
    background-color: ${brandColor};
    pointer-events: none;

    ${mediaLg} {
      height: 3px;
    }
  }
`

export default TextWithMarginLine

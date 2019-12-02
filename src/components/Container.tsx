import styled, { css } from "styled-components"

interface ContainerProps {
  removeRightMargin?: boolean
}

const Container = styled.div<ContainerProps>`
  margin-left: auto;
  margin-right: auto;
  max-width: 140rem;
  padding-left: 15%;
  ${({ removeRightMargin }) =>
    !removeRightMargin &&
    css`
      padding-right: 7.5%;
    `}
`

export default Container

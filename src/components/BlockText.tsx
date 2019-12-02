import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { largerTextFontSize } from "../variables/fontSizes"
import Container from "./Container"
import PrettyText from "./PrettyText"

interface BlockTextProps {
  largerFontSize?: boolean
}

const StyledBlockText = styled.div<BlockTextProps>`
  ${p => p.largerFontSize && largerTextFontSize};
`

const BlockText: FunctionComponent<BlockTextProps> = ({
  largerFontSize = true,
  children,
}) => {
  return (
    <StyledBlockText largerFontSize={largerFontSize}>
      <Container>
        <PrettyText>{children}</PrettyText>
      </Container>
    </StyledBlockText>
  )
}

export default BlockText

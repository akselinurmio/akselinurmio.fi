import React, { FunctionComponent } from "react"
import styled from "styled-components"
import Container from "./Container"
import PrettyText from "./PrettyText"

const StyledBlockText = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
`

const BlockText: FunctionComponent = ({ children }) => {
  return (
    <StyledBlockText>
      <Container>
        <PrettyText>{children}</PrettyText>
      </Container>
    </StyledBlockText>
  )
}

export default BlockText

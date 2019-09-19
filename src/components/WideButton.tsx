import React from "react"
import styled from "styled-components"
import { NavigationTarget } from "../types/MenuItem"
import { accentColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"
import { Link as GatsbyLink } from "gatsby"
import Container from "./Container"

interface WideButtonProps {
  target: NavigationTarget
}

const ExternalLink = styled.a`
  display: block;
  color: inherit;
  background-color: ${accentColor};
  text-decoration: none;
  padding-top: 3rem;
  padding-bottom: 3rem;
  transition: all 0.2s ${easeOutQuint};
`

const InternalLink = ExternalLink.withComponent(GatsbyLink)

const WideButton = ({ target }: WideButtonProps) => {
  const { title, url, isInternalLink } = target

  if (isInternalLink) {
    return (
      <InternalLink to={url}>
        <Container>{title}</Container>
      </InternalLink>
    )
  }

  return (
    <ExternalLink href={url}>
      <Container>{title}</Container>
    </ExternalLink>
  )
}

export default WideButton

import GatsbyLink from "./InternalLink"
import React from "react"
import styled from "styled-components"
import { accentColor, textColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"
import { ButtonProps } from "./Button"
import Container from "./Container"

const ExternalTargetButton = styled.a`
  display: block;
  color: ${textColor};
  background-color: ${accentColor};
  text-decoration: none;
  padding-top: 3rem;
  padding-bottom: 3rem;
  transition: all 0.2s ${easeOutQuint};
`

const InternalTargetButton = ExternalTargetButton.withComponent(GatsbyLink)

const Button = ({ target, onClick }: ButtonProps) => {
  const { title, url, isInternalLink } = target

  if (isInternalLink) {
    return (
      <InternalTargetButton to={url} onClick={onClick}>
        <Container>{title}</Container>
      </InternalTargetButton>
    )
  }

  return (
    <ExternalTargetButton href={url} onClick={onClick}>
      <Container>{title}</Container>
    </ExternalTargetButton>
  )
}

export default Button

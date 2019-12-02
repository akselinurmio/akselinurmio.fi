import Link from "./InternalLink"
import React from "react"
import styled from "styled-components"
import { NavigationTarget } from "../types/MenuItem"
import { accentColor, textColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"

// Export interface to share it with WideButton
export interface ButtonProps {
  target: NavigationTarget
  onClick?: () => void
}

const ExternalTargetButton = styled.a`
  display: inline-block;
  color: ${textColor};
  background-color: ${accentColor};
  text-decoration: none;
  padding: 1em 2em;
  transition: all 0.2s ${easeOutQuint};
`

const InternalTargetButton = ExternalTargetButton.withComponent(Link)

const Button = ({ target, onClick }: ButtonProps) => {
  const { title, url, isInternalLink } = target

  if (isInternalLink) {
    return (
      <InternalTargetButton to={url} onClick={onClick}>
        {title}
      </InternalTargetButton>
    )
  }

  return (
    <ExternalTargetButton href={url} onClick={onClick}>
      {title}
    </ExternalTargetButton>
  )
}

export default Button

import React from "react"
import styled from "styled-components"
import { NavigationTargetList } from "../types/MenuItem"
import { Link as GatsbyLink } from "gatsby"
import { brandColor } from "../variables/colors"

interface NavigationMobileProps {
  menuItems: NavigationTargetList
  goBackToDocument: () => void
}

const StyledNavigation = styled.nav``

const Items = styled.ul`
  list-style: none;
  padding: 0;
`

const Item = styled.li`
  display: block;
  position: relative;
  margin-top: 5rem;

  &:first-child {
    margin-top: 0;
  }
`

const InternalLink = styled(GatsbyLink)`
  color: inherit;

  &.active {
    &::before {
      content: "";
      position: absolute;
      top: 0.809em;
      right: 105%;
      right: calc(100% + 0.5em);
      width: 100%;
      width: 50vw;
      height: 2px;
      background-color: ${brandColor};
      pointer-events: none;
    }
  }
`

const ExternalLink = InternalLink.withComponent("a")

const NavigationMobile = ({
  menuItems = [],
  goBackToDocument,
}: NavigationMobileProps) => {
  const items = menuItems.map(({ title, url, isInternalLink }) => (
    <Item key={title}>
      {isInternalLink ? (
        <InternalLink
          to={url}
          activeClassName="active"
          onClick={goBackToDocument}
        >
          {title}
        </InternalLink>
      ) : (
        <ExternalLink href={url} onClick={goBackToDocument}>
          {title}
        </ExternalLink>
      )}
    </Item>
  ))

  return (
    <StyledNavigation aria-label="Main menu">
      <Items>{items}</Items>
    </StyledNavigation>
  )
}

export default NavigationMobile

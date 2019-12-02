import Link from "./InternalLink"
import React from "react"
import styled from "styled-components"
import { NavigationTarget, NavigationTargetList } from "../types/MenuItem"
import Button from "./Button"

interface NavigationDesktopProps {
  buttonTarget?: NavigationTarget
  menuItems: NavigationTargetList
}

const StyledNavigation = styled.div``

const Items = styled.ul`
  display: flex;
  align-items: center;

  list-style: none;
  padding: 0;
`

const Item = styled.li`
  display: block;
  position: relative;
  margin-left: 4rem;

  &:first-child {
    margin-left: 0;
  }
`

const InternalLink = styled(Link)`
  color: inherit;
`

const ExternalLink = InternalLink.withComponent("a")

const NavigationMobile = ({
  menuItems = [],
  buttonTarget,
}: NavigationDesktopProps) => {
  const items = menuItems.map(item => (
    <Item key={item.title}>
      {item.isInternalLink ? (
        <InternalLink to={item.url} activeClassName="active">
          {item.title}
        </InternalLink>
      ) : (
        <ExternalLink href={item.url}>{item.title}</ExternalLink>
      )}
    </Item>
  ))

  return (
    <StyledNavigation>
      <Items>
        {items}
        {buttonTarget && (
          <Item>
            <Button target={buttonTarget} />
          </Item>
        )}
      </Items>
    </StyledNavigation>
  )
}

export default NavigationMobile

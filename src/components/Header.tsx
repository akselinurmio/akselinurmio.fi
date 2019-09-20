import { Link } from "gatsby"
import React, { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { NavigationTargetList, NavigationTarget } from "../types/MenuItem"
import { backgroundColor } from "../variables/colors"
import { zIndexHeader } from "../variables/zIndices"
import Container from "./Container"
import Sandwich from "./Sandwich"
import MobileMenu from "./MobileMenu"
import { mediaMd } from "../variables/mediaQueries"

interface HeaderProps {
  siteName: string
  menuItems: NavigationTargetList
  isMobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
  mobileMenuButton?: NavigationTarget
}

const StyledHeader = styled.header``

const Bar = styled.div`
  position: relative;
  z-index: ${zIndexHeader};
  background-color: ${backgroundColor};
`
const BarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  height: 10rem;
`

const SiteNameWrapper = styled.div``

const SiteName = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: inherit;

  ${mediaMd} {
    font-size: 2.6rem;
  }
`

const ToggleWrapper = styled.div`
  flex-shrink: 0;
  margin-left: 2rem;

  ${mediaMd} {
    display: none;
  }
`

const Header = ({
  siteName,
  menuItems,
  isMobileMenuOpen,
  setMobileMenuOpen,
  mobileMenuButton,
}: HeaderProps) => {
  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  return (
    <StyledHeader>
      <Bar>
        <Container>
          <BarInner>
            <SiteNameWrapper>
              <SiteName to="/" onClick={closeMobileMenu}>
                {siteName}
              </SiteName>
            </SiteNameWrapper>
            <ToggleWrapper>
              <Sandwich
                isToggled={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </ToggleWrapper>
          </BarInner>
        </Container>
      </Bar>
      <MobileMenu
        isVisible={isMobileMenuOpen}
        menuItems={menuItems}
        bottomButton={mobileMenuButton}
        close={closeMobileMenu}
      />
    </StyledHeader>
  )
}

export default Header

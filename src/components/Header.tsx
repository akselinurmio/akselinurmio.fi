import React, { Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"
import { NavigationTarget, NavigationTargetList } from "../types/MenuItem"
import createElementId from "../utilities/createElementId"
import { backgroundColor } from "../variables/colors"
import { mediaMd } from "../variables/mediaQueries"
import { zIndexHeader } from "../variables/zIndices"
import Container from "./Container"
import MobileMenu from "./MobileMenu"
import NavigationDesktop from "./NavigationDesktop"
import Sandwich from "./Sandwich"
import SiteName from "./SiteName"

interface HeaderProps {
  siteName: string
  desktopMenuItems: NavigationTargetList
  mobileMenuItems: NavigationTargetList
  mobileMenuButton?: NavigationTarget
  isMobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<boolean>
}

const StyledHeader = styled.header``

const NavigationBar = styled.nav`
  position: relative;
  background-color: ${backgroundColor};
  overflow: hidden;
`
const BarInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  height: 10rem;
`

const SiteNameWrapper = styled.div`
  z-index: ${zIndexHeader};
`

const NavigationWrapperDesktop = styled.div`
  display: none;
  margin-left: 4rem;
  z-index: ${zIndexHeader};

  ${mediaMd} {
    display: block;
  }
`

const NavigationWrapperMobile = styled.div`
  flex-shrink: 0;
  margin-left: 2rem;

  ${mediaMd} {
    display: none;
  }
`

const Header = ({
  siteName,
  desktopMenuItems,
  mobileMenuItems,
  mobileMenuButton,
  isMobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) => {
  const [mobileMenuId] = useState(createElementId)

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen)

  return (
    <StyledHeader aria-label="Site header">
      <NavigationBar role="navigation" aria-label="Main navigation">
        <Container>
          <BarInner>
            <SiteNameWrapper>
              <SiteName to="/" onClick={closeMobileMenu}>
                {siteName}
              </SiteName>
            </SiteNameWrapper>
            <NavigationWrapperDesktop>
              <NavigationDesktop menuItems={desktopMenuItems} />
            </NavigationWrapperDesktop>
            <NavigationWrapperMobile>
              <Sandwich
                label="Show navigation"
                isToggled={isMobileMenuOpen}
                onClick={toggleMobileMenu}
                controlsId={mobileMenuId}
              />
              <MobileMenu
                bottomButtonTarget={mobileMenuButton}
                close={closeMobileMenu}
                id={mobileMenuId}
                isVisible={isMobileMenuOpen}
                menuItems={mobileMenuItems}
              />
            </NavigationWrapperMobile>
          </BarInner>
        </Container>
      </NavigationBar>
    </StyledHeader>
  )
}

export default Header

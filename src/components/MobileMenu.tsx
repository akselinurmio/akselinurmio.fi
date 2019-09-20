import React from "react"
import styled, { createGlobalStyle, css } from "styled-components"
import { NavigationTarget, NavigationTargetList } from "../types/MenuItem"
import { backgroundColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"
import { mediaMd, mediaMdMax } from "../variables/mediaQueries"
import { zIndexMobileMenu } from "../variables/zIndices"
import Container from "./Container"
import NavigationMobile from "./NavigationMobile"
import WideButton from "./WideButton"

interface MobileMenuProps {
  isVisible: boolean
  menuItems: NavigationTargetList
  bottomButton?: NavigationTarget
  close: () => void
}

interface StyledMobileMenuProps {
  isVisible: boolean
}

const GlobalMobileMenuStyle = createGlobalStyle`
  ${({ isVisible }: StyledMobileMenuProps) =>
    isVisible &&
    css`
      ${mediaMdMax} {
        body {
          position: fixed;
          overflow: hidden;
          height: 100%;
          width: 100%;
        }
      }
    `};
`

const StyledMobileMenu = styled.div<StyledMobileMenuProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndexMobileMenu};
  display: flex;
  background-color: ${backgroundColor};
  padding-top: 10rem;

  transition: all 600ms ${easeOutQuint};
  visibility: hidden;
  transform: translateX(-100%);

  ${mediaMd} {
    display: none;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      visibility: visible;
      transform: none;
    `};
`

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
`

const NavigationArea = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`

const ContactButtonArea = styled.div``

const MobileMenu = ({
  isVisible,
  menuItems,
  bottomButton: buttonTarget,
  close,
}: MobileMenuProps) => {
  return (
    <StyledMobileMenu isVisible={isVisible}>
      <GlobalMobileMenuStyle isVisible={isVisible} />
      <Wrapper>
        <NavigationArea>
          <Container>
            <NavigationMobile menuItems={menuItems} goBackToDocument={close} />
          </Container>
        </NavigationArea>
        {buttonTarget && (
          <ContactButtonArea>
            <WideButton target={buttonTarget} onClick={close} />
          </ContactButtonArea>
        )}
      </Wrapper>
    </StyledMobileMenu>
  )
}

export default MobileMenu

import React, { MouseEventHandler } from "react"
import styled, { css } from "styled-components"
import { easeOutQuint } from "../variables/easings"
import { brandColor, brandColorLight } from "../variables/colors"

interface SandwichProps {
  isToggled: boolean
  onClick: MouseEventHandler
}

interface SandwichStyleProps {
  isToggled?: boolean
}

const StyledSandwich = styled.button<SandwichStyleProps>`
  display: block;
  position: relative;
  border: none;
  border-radius: 0;
  background: none;
  width: 4rem;
  height: 4rem;
  padding: 0;
  cursor: pointer;
`

const Half = styled.span<SandwichStyleProps>`
  position: absolute;
  top: 1rem;
  left: 0.5rem;
  width: 3rem;
  height: 2rem;
  transition: transform 200ms ${easeOutQuint};
`

const TopHalf = styled(Half)`
  ${({ isToggled }) =>
    isToggled &&
    css`
      transform: rotate(45deg);
      transition: transform 200ms ${easeOutQuint} 300ms;
    `};
`

const BottomHalf = styled(Half)`
  ${({ isToggled }) =>
    isToggled &&
    css`
      transform: rotate(-45deg);
      transition: transform 200ms ${easeOutQuint} 300ms;
    `};
`

const Bread = styled.span<SandwichStyleProps>`
  background-color: ${brandColor};
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  transition: transform 200ms ${easeOutQuint} 300ms;
`

const TopBread = styled(Bread)`
  top: 0;

  ${({ isToggled }) =>
    isToggled &&
    css`
      transform: translateY(calc(1rem - 1px));
      transition: transform 200ms ${easeOutQuint};
    `};
`

const BottomBread = styled(Bread)`
  bottom: 0;

  ${({ isToggled }) =>
    isToggled &&
    css`
      transform: translateY(calc(-1rem + 1px));
      transition: transform 200ms ${easeOutQuint};
    `};
`

/* Following mouseDown event handler removes the button's focus after click,
   so that there is no outline after that */
const onMouseDown: MouseEventHandler = e => e.preventDefault()

const Sandwich = ({ isToggled, onClick }: SandwichProps) => {
  const label = isToggled ? "Close navigation" : "Open navigation"

  return (
    <StyledSandwich
      aria-label={label}
      onClick={onClick}
      onMouseDown={onMouseDown}
      isToggled={isToggled}
    >
      <TopHalf isToggled={isToggled}>
        <TopBread isToggled={isToggled} />
      </TopHalf>
      <BottomHalf isToggled={isToggled}>
        <BottomBread isToggled={isToggled} />
      </BottomHalf>
    </StyledSandwich>
  )
}

export default Sandwich

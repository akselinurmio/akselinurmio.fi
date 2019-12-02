import React, { MouseEventHandler } from "react"
import styled, { css } from "styled-components"
import { brandColor } from "../variables/colors"
import { easeOutQuint } from "../variables/easings"
import { zIndexHeader } from "../variables/zIndices"

interface SandwichProps {
  label: string
  isToggled: boolean
  onClick: MouseEventHandler
  controlsId?: string
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
  z-index: ${zIndexHeader};
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
      transition: transform 200ms ${easeOutQuint} 200ms;
    `};
`

const BottomHalf = styled(Half)`
  ${({ isToggled }) =>
    isToggled &&
    css`
      transform: rotate(-45deg);
      transition: transform 200ms ${easeOutQuint} 200ms;
    `};
`

const Bread = styled.span<SandwichStyleProps>`
  background-color: ${brandColor};
  position: absolute;
  width: 100%;
  height: 2px;
  left: 0;
  transition: transform 200ms ${easeOutQuint} 200ms;
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

const Sandwich = ({ label, isToggled, onClick, controlsId }: SandwichProps) => {
  return (
    <StyledSandwich
      aria-controls={controlsId}
      aria-expanded={isToggled}
      aria-label={label}
      aria-pressed={isToggled}
      isToggled={isToggled}
      onClick={onClick}
      onMouseDown={onMouseDown}
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

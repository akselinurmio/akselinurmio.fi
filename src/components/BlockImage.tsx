import Image, { FluidObject } from "gatsby-image"
import React from "react"
import styled from "styled-components"
import Container from "./Container"

interface BlockImageProps {
  fluidImage: FluidObject
  altText: string
  caption?: string
}

const StyledBlockImage = styled.figure`
  margin: 0;
  margin-top: 4rem;
  margin-bottom: 4rem;
`

const StyledImage = styled(Image)`
  max-width: 70rem;
`

const StyledCaption = styled.div`
  max-width: 70rem;
  margin: 1rem 0;
`

const BlockImage = ({ altText, caption, fluidImage }: BlockImageProps) => {
  return (
    <StyledBlockImage>
      <Container>
        <StyledImage fluid={fluidImage} alt={altText} />
      </Container>
      {caption && (
        <figcaption>
          <Container>
            <StyledCaption>{caption}</StyledCaption>
          </Container>
        </figcaption>
      )}
    </StyledBlockImage>
  )
}

export default BlockImage

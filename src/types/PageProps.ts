import type { PageProps } from "gatsby"
import type { FixedObject, FluidObject } from "gatsby-image"

export type { PageProps }

interface FixedImageData {
  childImageSharp: {
    fixed: FixedObject
  }
}
interface FluidImageData {
  childImageSharp: {
    fluid: FluidObject
  }
}

export type WorkPageProps = PageProps<{
  heroImage: FixedImageData
  slushImage: FixedImageData & FluidImageData
  hdwImage: FixedImageData & FluidImageData
}>

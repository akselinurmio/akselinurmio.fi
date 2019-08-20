import React from "react"
import { Helmet } from "react-helmet"

interface SEOProps {
  title: string
  lang?: string
  description?: string
  image?: string
  imageAlt?: string
}

/**
 * Adds basic metadata to the page
 * @param props
 * @param props.title Page's title
 */
const SEO: React.FunctionComponent<SEOProps> = ({
  title,
  lang = "en",
  description,
  image,
  imageAlt,
}) => {
  const meta: JSX.IntrinsicElements["meta"][] = [
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      property: "og:title",
      content: title,
    },
  ]

  if (description) {
    meta.push(
      {
        name: "description",
        content: description,
      },
      {
        property: "og:description",
        content: description,
      },
    )
  }

  if (image) {
    meta.push(
      {
        property: "og:image",
        content: image,
      },
      {
        property: "twitter:image",
        content: image,
      },
    )

    if (imageAlt) {
      meta.push(
        {
          property: "og:image:alt",
          content: imageAlt,
        },
        {
          property: "twitter:image:alt",
          content: imageAlt,
        },
      )
    }
  }

  return <Helmet htmlAttributes={{ lang }} title={title} meta={meta} />
}

export default SEO

import React from "react"
import { Helmet } from "react-helmet"

interface SEOProps {
  title: string
  /** Language of the page in BCP47 format, defaults to "en" */
  lang?: string
  description?: string
  imageURL?: string
  imageAlt?: string
}

/** Adds basic metadata to the page */
const SEO: React.FunctionComponent<SEOProps> = ({
  title,
  lang = "en",
  description,
  imageURL,
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

  if (imageURL) {
    meta.push(
      {
        property: "og:image",
        content: imageURL,
      },
      {
        property: "twitter:image",
        content: imageURL,
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

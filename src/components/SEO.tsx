import React from "react"
import { Helmet } from "react-helmet"
import { WebPage, WithContext } from "schema-dts"
import useSiteMetadata from "../hooks/useSiteMetadata"
import StructuredData from "./StructuredData"

interface SEOProps {
  title: string
  path?: string
  /** Language of the page in BCP47 format, defaults to "en" */
  lang?: string
  description?: string
  imageURL?: string
  imageAlt?: string
  noIndex?: boolean
}

/** Adds basic metadata to the page */
const SEO: React.FunctionComponent<SEOProps> = ({
  title,
  path,
  lang: langProp,
  description,
  imageURL,
  imageAlt,
  noIndex,
}) => {
  const {
    name: siteName,
    siteUrl,
    defaultLanguage,
    twitterHandle,
  } = useSiteMetadata()

  const lang = langProp || defaultLanguage

  const meta: Array<JSX.IntrinsicElements["meta"]> = [
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "og:title",
      content: title,
    },
  ]

  const link: Array<JSX.IntrinsicElements["link"]> = []

  let structuredData: WithContext<WebPage> | undefined

  if (siteName) {
    meta.push({
      property: "og:site_name",
      content: siteName,
    })
  }

  if (siteUrl && path) {
    const absoluteUrl = siteUrl + path

    meta.push({
      property: "og:url",
      content: absoluteUrl,
    })

    link.push({
      rel: "canonical",
      href: absoluteUrl,
    })

    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl}#webpage`,
      name: title,
      description: description,
      url: absoluteUrl,
      inLanguage: lang,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: title,
            item: absoluteUrl,
          },
        ],
      },
      primaryImageOfPage: imageURL
        ? { "@type": "ImageObject", contentUrl: imageURL }
        : undefined,
    }
  }

  if (twitterHandle) {
    meta.push(
      {
        name: "twitter:site",
        content: twitterHandle,
      },
      {
        name: "twitter:creator",
        content: twitterHandle,
      },
    )
  }

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
        name: "twitter:image",
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
          name: "twitter:image:alt",
          content: imageAlt,
        },
      )
    }
  }

  if (noIndex) {
    meta.push({
      name: "robots",
      content: "noindex",
    })
  }

  const titleTag = title !== siteName ? `${title} - ${siteName}` : title

  return (
    <>
      <Helmet
        htmlAttributes={{ lang }}
        title={titleTag}
        meta={meta}
        link={link}
      />
      {structuredData && <StructuredData data={structuredData} />}
    </>
  )
}

export default SEO

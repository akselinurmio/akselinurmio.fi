import { useStaticQuery, graphql } from "gatsby"

interface ISiteMetadata {
  name: string
  defaultLanguage: string
  twitterHandle: string
  siteUrl: string
}

const useSiteMetadata: () => ISiteMetadata = () => {
  const data = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            name
            defaultLanguage
            twitterHandle
            siteUrl
          }
        }
      }
    `,
  )

  return data.site.siteMetadata
}

export default useSiteMetadata

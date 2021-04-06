import { useStaticQuery, graphql } from "gatsby"

interface ISiteMetadata {
  name: string
  defaultLanguage: string
  twitterHandle: string
  siteUrl: string
}

interface SiteMetadataResult {
  site: {
    siteMetadata: ISiteMetadata
  }
}

const useSiteMetadata = (): ISiteMetadata => {
  const data = useStaticQuery<SiteMetadataResult>(
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

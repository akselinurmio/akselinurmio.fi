import { graphql } from "gatsby"
import React from "react"
import Layout from "../layouts/MainLayout"

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

const IndexPage = (props: IndexPageProps) => {
  const { siteName } = props.data.site.siteMetadata

  return (
    <Layout>
      <h1>{siteName}</h1>
    </Layout>
  )
}

export default IndexPage

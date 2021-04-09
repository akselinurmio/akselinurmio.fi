import React from "react"
import BlockText from "../components/BlockText"
import Section from "../components/Section"
import SEO from "../components/SEO"
import MainLayout from "../layouts/MainLayout"

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <SEO title="Not Found" noIndex />
      <MainLayout>
        <Section>
          <BlockText>
            <h1>Beeboop, it’s 404 guys 🤖</h1>
            <p>Didn’t find a page with that, so so sorry!</p>
          </BlockText>
        </Section>
      </MainLayout>
    </React.Fragment>
  )
}

export default NotFoundPage

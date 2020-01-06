import Link from "../components/InternalLink"
import React from "react"
import BlockText from "../components/BlockText"
import Section from "../components/Section"
import SEO from "../components/SEO"
import MainLayout from "../layouts/MainLayout"
import { PageProps } from "../types/PageProps"

const ThanksPage = (props: PageProps) => {
  const path = props.location.pathname

  return (
    <React.Fragment>
      <SEO
        title="Thank you"
        description="Thanks for reaching out, I will get back to you within 24 hours."
        path={path}
        noIndex
      />
      <MainLayout>
        <Section>
          <BlockText>
            <h1>Thank you!</h1>
            <p>
              Thanks for reaching out, I will get back to you within 24 hours.
            </p>
            <p>
              Want to head for <Link to="/">the front page</Link>?
            </p>
          </BlockText>
        </Section>
      </MainLayout>
    </React.Fragment>
  )
}

export default ThanksPage

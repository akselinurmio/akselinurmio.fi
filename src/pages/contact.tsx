import React from "react"
import BlockText from "../components/BlockText"
import SEO from "../components/SEO"
import TextWithMarginLine from "../components/TextWithMarginLine"
import MainLayout from "../layouts/MainLayout"
import { PageProps } from "../types/PageProps"
import Section from "../components/Section"
import ExternalLink from "../components/ExternalLink"
import ContactForm from "../components/ContactForm"

const ContactPage = (props: PageProps) => {
  const path = props.location.pathname

  return (
    <React.Fragment>
      <SEO
        title="Contact me"
        description="Write me a message and I will get back to you within 24 hours."
        path={path}
      />
      <MainLayout>
        <Section as="div">
          <BlockText>
            <h1>
              <TextWithMarginLine>Send me a&nbsp;message</TextWithMarginLine>
            </h1>
            <p>
              Write me a message using the form below and I’ll get back to you
              within 24&nbsp;hours.
            </p>
            <p>
              You can also contact me on{" "}
              <ExternalLink
                href="https://www.linkedin.com/in/akselinurmio/"
                title="Akseli Nurmio on LinkedIn"
              >
                LinkedIn
              </ExternalLink>{" "}
              or{" "}
              <ExternalLink
                href="https://twitter.com/akselinurmio"
                title="Akseli Nurmio on Twitter"
              >
                Twitter
              </ExternalLink>
              .
            </p>
          </BlockText>
        </Section>
        <Section as="div">
          <BlockText largerFontSize={false}>
            <ContactForm />
          </BlockText>
        </Section>
      </MainLayout>
    </React.Fragment>
  )
}

export default ContactPage

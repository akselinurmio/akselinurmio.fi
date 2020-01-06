import Link from "../components/InternalLink"
import React from "react"
import BlockText from "../components/BlockText"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"
import TextWithMarginLine from "../components/TextWithMarginLine"
import VisuallyHidden from "../components/VisuallyHidden"
import MainLayout from "../layouts/MainLayout"
import { PageProps } from "../types/PageProps"
import Section from "../components/Section"

const title = "Akseli Nurmio"
const description =
  "Akseli Nurmio is a front-end developer based in Helsinki. " +
  "He has worked for Slush, Helsinki Design Week and more."

const structuredDataOfPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://akselinurmio.fi/#person",
  name: title,
  description: description,
  jobTitle: "Front-end developer",
  gender: "male",
  url: "https://akselinurmio.fi/",
  sameAs: [
    "https://www.linkedin.com/in/akselinurmio/",
    "https://twitter.com/akselinurmio",
  ],
  subjectOf: "https://akselinurmio.fi/#website",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Helsinki",
    addressCountry: "FI",
  },
  nationality: "FI",
  knowsAbout: [
    "development",
    "front-end development",
    "design",
    "UX design",
    "UI design",
  ],
  knowsLanguage: ["en", "fi"],
}

const structuredDataOfWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://akselinurmio.fi/#website",
  name: title,
  description: "The personal website of Akseli Nurmio",
  url: "https://akselinurmio.fi/",
  about: "https://akselinurmio.fi/#person",
  inLanguage: "en",
}

const IndexPage = (props: PageProps) => {
  const path = props.location.pathname

  return (
    <React.Fragment>
      <SEO title={title} description={description} path={path} />
      <MainLayout>
        <Section>
          <BlockText>
            <VisuallyHidden>
              <h1>Akseli Nurmio</h1>
            </VisuallyHidden>
            <p>
              <TextWithMarginLine>
                I’m Akseli, front-end developer based in Helsinki.
              </TextWithMarginLine>
            </p>

            <p>I write clean code to create meaningful online experiences.</p>
            <p>
              I have worked for <Link to="/works/#slush">Slush</Link>,{" "}
              <Link to="/works/#helsinkidesignweek">Helsinki Design Week</Link>{" "}
              and many more.
            </p>
          </BlockText>
        </Section>
        <Section>
          <BlockText>
            <h2>Get in touch</h2>
            <p>
              If you want to get in touch with me, just follow the white
              rabbit.*
            </p>
            <p>
              Or <Link to="/contact/">send me a message</Link>.
            </p>
            <p>
              <small>
                *Please don’t follow the rabbit, he gets a little anxious about
                that.
              </small>
            </p>
          </BlockText>
        </Section>
      </MainLayout>
      <StructuredData data={structuredDataOfPerson} />
      <StructuredData data={structuredDataOfWebSite} />
    </React.Fragment>
  )
}

export default IndexPage

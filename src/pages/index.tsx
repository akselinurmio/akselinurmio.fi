import React from "react"
import MainLayout from "../layouts/MainLayout"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"
import BlockText from "../components/BlockText"
import LeadParagraph from "../components/LeadParagraph"

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
  knowsAbout: ["development", "design"],
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

const IndexPage = () => {
  return (
    <React.Fragment>
      <SEO title={title} description={description} />
      <MainLayout>
        <BlockText>
          <p>
            <LeadParagraph>
              I’m Akseli, front-end developer based in Helsinki.  
            </LeadParagraph>
          </p>
          <p>I write clean code to create meaningful experiences.  </p>
          <p>I have worked for Slush, Helsinki Design Week and many more.</p>
        </BlockText>
      </MainLayout>
      <StructuredData data={structuredDataOfPerson} />
      <StructuredData data={structuredDataOfWebSite} />
    </React.Fragment>
  )
}

export default IndexPage

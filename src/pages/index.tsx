import React from "react"
import Layout from "../layouts/MainLayout"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"
import Container from "../components/Container"

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
    <>
      <SEO title={title} description={description} />
      <Layout>
        <Container>
          <h1>{title}</h1>
        </Container>
      </Layout>
      <StructuredData data={structuredDataOfPerson} />
      <StructuredData data={structuredDataOfWebSite} />
    </>
  )
}

export default IndexPage

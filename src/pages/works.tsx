import { graphql } from "gatsby"
import React from "react"
import BlockImage from "../components/BlockImage"
import BlockText from "../components/BlockText"
import ExternalLink from "../components/ExternalLink"
import InternalLink from "../components/InternalLink"
import Section from "../components/Section"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"
import TextWithMarginLine from "../components/TextWithMarginLine"
import useSiteMetadata from "../hooks/useSiteMetadata"
import MainLayout from "../layouts/MainLayout"
import { PagePropsWithData } from "../types/PageProps"

const title = "Works"
const description =
  "I have been working for Slush, Helsinki Design Week and more. " +
  "Check out some of my selected works!"

const WorksPage = (props: PagePropsWithData) => {
  const path = props.location.pathname
  const { data } = props

  const { siteUrl: baseUrl } = useSiteMetadata()

  const heroImageUrl = baseUrl + data.heroImage.childImageSharp.fixed.src

  const slushImageFluid = data.slushImage.childImageSharp.fluid
  const slushImageUrl = baseUrl + data.slushImage.childImageSharp.fixed.src

  const hdwImageFluid = data.hdwImage.childImageSharp.fluid
  const hdwImageUrl = baseUrl + data.hdwImage.childImageSharp.fixed.src

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    creator: "https://akselinurmio.fi/#person",
  }

  const structuredDataSlush = {
    ...baseStructuredData,
    "@id": "https://akselinurmio.fi/works#slush",
    name: "Slush.org",
    description:
      "For Slush 2018 I developed a web app for Slush.org’s front page. " +
      "Watch live streams, explore the programme or dive in to the side events.",
    url: "https://www.slush.org/",
    sameAs: "https://www.evermade.fi/cases/slush-org/",
    image: slushImageUrl,
    about: {
      "@type": "Event",
      name: "Slush 2018",
      url: "https://www.slush.org/",
      startDate: "2018-12-04",
      endDate: "2018-12-05",
    },
  }

  const structuredDataHdw = {
    ...baseStructuredData,
    "@id": "https://akselinurmio.fi/works#helsinkidesignweek",
    name: "Helsinki Design Week",
    description:
      "I was a developer in Helsinki Design Week’s website project. " +
      "They needed a new website to suit their needs during the event, and as a content hub.",
    url: "https://www.helsinkidesignweek.com/",
    sameAs: "https://www.evermade.fi/cases/helsinki-design-week/",
    image: hdwImageUrl,
  }

  return (
    <React.Fragment>
      <SEO
        title={title}
        description={description}
        path={path}
        imageURL={heroImageUrl}
        imageAlt="Mockups of Slush’s and Helsinki Design Week’s front pages"
      />
      <MainLayout>
        <Section>
          <BlockText>
            <h1>
              <TextWithMarginLine>From the works</TextWithMarginLine>
            </h1>
            <p>I wrote my first website at the age of nine.</p>
            <p>
              After that I have been involved in the birth and rebirth of
              numerous websites and apps.
            </p>
            <p>Let me present you a few of those.</p>
          </BlockText>
        </Section>
        <Section as="article" id="slush" aria-labelledby="slush-heading">
          <BlockText>
            <h2 id="slush-heading">
              <TextWithMarginLine>Slush.org</TextWithMarginLine>
            </h2>
            <p>
              At Evermade I created a bunch of cool stuff for a startup event
              called{" "}
              <ExternalLink href="https://www.slush.org/" title="Slush.org">
                Slush
              </ExternalLink>
              .
            </p>
            <p>
              For Slush 2018 I developed a web app for event’s front page. There
              you could watch the live streams, explore the programme or dive in
              to the side events.
            </p>
            <p>Tools used were React, Redux, GraphQL and Sass.</p>
          </BlockText>
          <BlockImage
            altText="Screenshot of Slush 2018 front page"
            fluidImage={slushImageFluid}
          />
        </Section>
        <Section
          as="article"
          id="helsinkidesignweek"
          aria-labelledby="helsinkidesignweek-heading"
        >
          <BlockText>
            <h2 id="helsinkidesignweek-heading">
              <TextWithMarginLine>Helsinki Design Week</TextWithMarginLine>
            </h2>
            <p>
              Helsinki Design Week is the largest design festival in the
              Nordics.
            </p>
            <p>
              They needed a new website to suit their needs during the event,
              and as a content hub.
            </p>
            <p>I worked as a developer on the project in 2017.</p>
          </BlockText>
          <BlockImage
            altText="Screenshot of Helsinki Design Week’s website"
            fluidImage={hdwImageFluid}
          />
          <BlockText>
            <p>
              <ExternalLink
                href="https://www.helsinkidesignweek.com/"
                title="Helsinki Design Week’s website"
              >
                Visit the site
              </ExternalLink>
            </p>
          </BlockText>
        </Section>
        <Section>
          <BlockText>
            <h2>
              <TextWithMarginLine>Have a question?</TextWithMarginLine>
            </h2>
            <p>
              <InternalLink to="/contact/">Send me a message</InternalLink>
            </p>
          </BlockText>
        </Section>
      </MainLayout>
      <StructuredData data={structuredDataSlush} />
      <StructuredData data={structuredDataHdw} />
    </React.Fragment>
  )
}

export default WorksPage

export const query = graphql`
  {
    heroImage: file(relativePath: { eq: "portfolio.png" }) {
      childImageSharp {
        fixed(width: 1200, toFormat: JPG) {
          src
        }
      }
    }
    slushImage: file(relativePath: { eq: "slush-org.png" }) {
      childImageSharp {
        fluid(maxWidth: 700, quality: 80, toFormat: JPG) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 1200, toFormat: JPG) {
          src
        }
      }
    }
    hdwImage: file(relativePath: { eq: "helsinki-design-week.png" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
        fixed(width: 1200) {
          src
        }
      }
    }
  }
`

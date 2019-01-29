import React from "react";
import Page from "../components/Page";
import Meta from "../components/Meta";
import StructuredData from "../components/StructuredData";
import Hero from "../components/Hero";
import { Link } from "gatsby";

const page = () => (
	<Page>
		<main>
			<Hero
				headingChunks={[
					"Hello there! 👋",
					"I’m Akseli, full-stack developer, designer and eternal student.",
				]}
			>
				<p>
					Check some of <Link to="/works">my works</Link> or have a look in my{" "}
					<a href="https://www.linkedin.com/in/akselinurmio/">
						LinkedIn profile
					</a>
					!
				</p>
			</Hero>
		</main>
		<Meta
			title="Akseli Nurmio"
			description="Akseli Nurmio is full-stack developer, designer and eternal student."
		/>
		<StructuredData
			data={{
				"@context": "https://schema.org",
				"@type": "Person",
				"@id": "https://akselinurmio.fi/#person",
				name: "Akseli Nurmio",
				givenName: "Akseli",
				familyName: "Nurmio",
				url: "https://akselinurmio.fi/",
				description: "Full-stack developer and designer",
				sameAs: [
					"https://www.linkedin.com/in/akselinurmio/",
					"https://twitter.com/akselinurmio",
				],
				knowsLanguage: ["fi", "en"],
			}}
		/>
		<StructuredData
			data={{
				"@context": "https://schema.org",
				"@type": "WebSite",
				"@id": "https://akselinurmio.fi/#website",
				name: "Akseli Nurmio",
				url: "https://akselinurmio.fi/",
			}}
		/>
	</Page>
);

export default page;

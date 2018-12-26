import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Name from '../components/Name'

const IndexPage = () => (
	<Layout>
		<Helmet>
			<title>Akseli Nurmio</title>
			<meta name="description" content="I'm Akseli Nurmio." />
			<link rel="icon" href="/favicon.ico" type="image/x-icon" />
		</Helmet>

		<Name
			name="Akseli Nurmio"
			link="https://www.linkedin.com/in/akselinurmio/"
			title="Akseli Nurmio at LinkedIn"
		/>
	</Layout>
)

export default IndexPage

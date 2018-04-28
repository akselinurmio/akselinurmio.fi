import React from 'react'
import Helmet from 'react-helmet'

import { main as style } from '../styles/index.module.css'

import Name from '../components/Name'

const IndexPage = () => (
	<main className={style}>
		<Helmet>
			<title>Akseli Nurmio</title>
			<meta name="description" content="I'm Akseli Nurmio." />
		</Helmet>

		<Name
			name="Akseli Nurmio"
			link="https://www.linkedin.com/in/akselinurmio/"
			title="Akseli Nurmio at LinkedIn"
		/>
	</main>
)

export default IndexPage

import React from 'react'
import Helmet from 'react-helmet'

import '../styles/global.css'
import './Layout.css'

export default ({ children }) => (
	<main className="Layout">
		<Helmet>
			<html lang="en" />
		</Helmet>
		{children}
	</main>
)

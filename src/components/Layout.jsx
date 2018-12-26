import React from 'react'
import Helmet from 'react-helmet'

import '../styles/global.css'
import './Layout.css'

const Layout = ({ children }) => (
	<main className="Layout">
		<Helmet>
			<html lang="en" />
		</Helmet>
		{children}
	</main>
)

export default Layout

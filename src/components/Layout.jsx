import React from 'react'
import Helmet from 'react-helmet'

import '../styles/globalstyles.css'
import { main as style } from '../styles/Layout.module.css'

const Layout = ({ children }) => (
	<main className={style}>
		<Helmet>
			<html lang="en" />
		</Helmet>
		{children}
	</main>
)

export default Layout

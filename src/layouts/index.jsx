import React from 'react'
import Helmet from 'react-helmet'

import '../styles/globalstyles.css'

const MainLayout = ({ children }) => (
	<div className="mainlayout">
		<Helmet>
			<html lang="en" />
		</Helmet>
		{children()}
	</div>
)

export default MainLayout

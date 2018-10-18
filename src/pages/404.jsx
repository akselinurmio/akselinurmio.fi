import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import Layout from '../components/Layout'

const NotFoundPage = () => (
	<Layout>
		<Helmet>
			<title>You monkey, me no page</title>
		</Helmet>

		<h1>You monkey, me no page</h1>
		<p>
			Hello, is it <Link to="/">me</Link> you're looking for?
		</p>
	</Layout>
)

export default NotFoundPage

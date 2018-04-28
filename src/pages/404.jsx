import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const NotFoundPage = () => (
	<div>
		<Helmet>
			<title>You monkey, me no page</title>
		</Helmet>

		<h1>You monkey, me no page</h1>
		<p>
			Hello, is it <Link to="/">me</Link> you're looking for?
		</p>
	</div>
)

export default NotFoundPage

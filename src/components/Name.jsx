import React from 'react'

import './Name.css'

const Name = ({ name, link, title }) => (
	<h1 className="Name">
		<a href={link} title={title} className="Name__link">
			{name}
		</a>
	</h1>
)

export default Name

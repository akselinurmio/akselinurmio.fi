import React from 'react'

import styles from '../styles/Name.module.css'

const Name = props => (
	<h1 className={styles.name}>
		<a href={props.link} title={props.title} className={styles.link}>
			{props.name}
		</a>
	</h1>
)

export default Name

module.exports = {
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Akseli Nurmio',
				start_url: '/',
				theme_color: '#ffff00',
				background_color: '#000000',
				icon: 'src/images/favicon.svg',
			},
		},
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: 'https://akselinurmio.fi',
			},
		},
	],
}

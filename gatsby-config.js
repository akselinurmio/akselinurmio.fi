module.exports = {
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: 'https://akselinurmio.fi',
			},
		},
	],
}

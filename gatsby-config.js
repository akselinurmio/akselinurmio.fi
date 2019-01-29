module.exports = {
	plugins: [
		{
			resolve: "gatsby-plugin-styled-components",
		},
		{
			resolve: "gatsby-plugin-react-helmet",
		},
		{
			resolve: "gatsby-plugin-react-svg",
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Akseli Nurmio",
				start_url: "/",
				icon: "src/images/logo.svg",
			},
		},
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: "https://akselinurmio.fi",
			},
		},
	],
};

module.exports = {
  siteMetadata: {
    name: "Akseli Nurmio",
    defaultLanguage: "en",
    twitterHandle: "@akselinurmio",
    siteUrl: "https://akselinurmio.fi",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-typescript",
    },
    {
      resolve: "gatsby-plugin-react-helmet",
    },
    {
      resolve: "gatsby-plugin-styled-components",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/assets/images/`,
      },
    },
    {
      resolve: "gatsby-transformer-sharp",
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 70,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/thanks"],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Akseli Nurmio",
        short_name: "Akseli Nurmio",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#2600ff",
        icon: "assets/favicon.svg",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
    },
    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload",
          ],
          "/*.webmanifest": ["Content-Type: application/manifest+json"],
        },
      },
    },
  ],
}

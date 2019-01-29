import React from "react";
import Helmet from "react-helmet";

const Meta = ({
	title,
	description,
	image,
	imageAlt,
	url,
	language = "en",
	type = "website",
}) => (
	<Helmet>
		{title ? <title>{title}</title> : null}
		{title ? <meta property="og:title" content={title} /> : null}
		{description ? <meta name="description" content={description} /> : null}
		{description ? (
			<meta property="og:description" content={description} />
		) : null}
		{image ? <meta name="twitter:card" content="summary_large_image" /> : null}
		{image ? <meta property="og:image" content={image} /> : null}
		{imageAlt ? <meta name="twitter:image:alt" content={imageAlt} /> : null}
		{url ? <meta property="og:url" content={url} /> : null}
		<meta property="og:locale" content={language} />
		<meta property="og:type" content={type} />
	</Helmet>
);

export default Meta;

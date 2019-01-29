import React from "react";
import { Link } from "gatsby";
import Page from "../components/Page";
import Meta from "../components/Meta";

const pageTitle = "Are you lost, homeboe?";

const page = () => (
	<Page>
		<Meta title={pageTitle} />
		<h1>{pageTitle}</h1>
		<p>
			{"Hello, is it "}
			<Link to="/">me</Link>
			{" you're looking for?"}
		</p>
	</Page>
);

export default page;

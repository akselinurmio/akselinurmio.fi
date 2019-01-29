import styled from "styled-components";
import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../utilities/themes";
import Container from "./Container";
import Fonts from "./Fonts";
import GlobalStyles from "./GlobalStyles";
import Helmet from "react-helmet";
import Header from "./Header";

const StyledPage = styled.div`
	margin-top: 4rem;
	margin-bottom: 4rem;
`;

const Page = ({ children, language = "en" }) => (
	<ThemeProvider theme={defaultTheme}>
		<Container>
			<Fonts />
			<GlobalStyles />
			<Helmet>
				<html lang={language} />
			</Helmet>
			<StyledPage>
				<Header />
				{children}
			</StyledPage>
		</Container>
	</ThemeProvider>
);

export default Page;

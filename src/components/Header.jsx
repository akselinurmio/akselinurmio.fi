import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

const StyledHeader = styled.header`
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const Header = () => (
	<StyledHeader>
		<Navigation />
	</StyledHeader>
);

export default Header;

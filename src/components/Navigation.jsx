import React from "react";
import styled, { keyframes } from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import LogoImage from "../images/logo.svg";
import { easingEaseOutQuint } from "../utilities/styleVariables";
import HiddenText from "./HiddenText";

const siteName = "Akseli Nurmio";
const navigationItems = [
	{ to: "/works", text: "Works" },
	{ to: "/contact", text: "Contact" },
];

const StyledNavigation = styled.nav`
	ul {
		list-style: none;
		padding: 0;

		display: flex;
		align-items: center;
		margin: -1.5rem;
	}
`;

const List = styled.ul`
	list-style: none;
	padding: 0;

	display: flex;
	align-items: center;
	margin: -1.5rem;
`;

const ListItem = styled.li`
	display: flex;
	flex-wrap: wrap;
	margin: 1.5rem;
`;

const Link = styled(GatsbyLink)`
	display: flex;
	align-items: center;
	text-decoration: none;

	&:active {
		transform: scale(0.9);
	}

	&.active {
		color: blue;
	}
`;

const reveal = keyframes`
	0% {
		transform: scale(10);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: none;
	}
`;

const Logo = styled(LogoImage)`
	height: 4rem;
	width: auto;

	path {
		animation: ${reveal} 500ms 200ms both ${easingEaseOutQuint};
		transform-origin: center;
		fill: currentColor;
	}
`;

const Navigation = () => (
	<StyledNavigation>
		<List>
			<ListItem>
				<Link to="/" activeClassName="active">
					<Logo className="Navigation__logo" />
					<HiddenText>{siteName}</HiddenText>
				</Link>
			</ListItem>
			{navigationItems.map(item => (
				<ListItem key={item.text}>
					{item.external ? (
						<Link
							href={item.to}
							as="a"
							target="_blank"
							rel="noopener noreferrer nofollow"
						>
							{item.text}
						</Link>
					) : (
						<Link to={item.to} activeClassName="active">
							{item.text}
						</Link>
					)}
				</ListItem>
			))}
		</List>
	</StyledNavigation>
);

export default Navigation;

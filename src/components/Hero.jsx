import React from "react";
import styled, { css, keyframes } from "styled-components";
import { easingEaseOutQuint } from "../utilities/styleVariables";

const reveal = keyframes`
	0% {
		opacity: 0;
		transform: translateY(50%);
	}
	100% {
		opacity: 1;
		transform: none;
	}
`;

const StyledHero = styled.div`
	max-width: 80rem;
	margin-top: 6rem;
	margin-bottom: 6rem;
`;

const Heading = styled.p`
	font-size: 4rem;
`;

const Chunk = styled.span`
	animation-name: ${reveal};
	animation-timing-function: ${easingEaseOutQuint};
	animation-fill-mode: both;

	${props =>
		props.isFirst
			? css`
					animation-duration: 0.5s;
					animation-delay: 0.5s;
					display: inline-block;
			  `
			: css`
					animation-duration: 1s;
					animation-delay: 1.5s;
			  `}
`;

const Hero = ({ headingChunks, children }) => (
	<StyledHero>
		<Heading>
			{headingChunks.map((c, i) => (
				<React.Fragment key={c}>
					<Chunk isFirst={!i}>{c}</Chunk>{" "}
				</React.Fragment>
			))}
		</Heading>
		{children}
	</StyledHero>
);

export default Hero;

import { createGlobalStyle, css } from "styled-components";
import {
	fontBodyFamily,
	fontBodyWeight,
	fontBodyLineHeight,
	fontSizeDefault,
} from "../utilities/styleVariables";

const GlobalStyles = createGlobalStyle`${css`
	:root {
		box-sizing: border-box;
		font-size: 10px;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	body {
		margin: 0;
		background: ${props => props.theme.back};
		color: ${props => props.theme.front};
		font-family: ${fontBodyFamily};
		font-weight: ${fontBodyWeight};
		line-height: ${fontBodyLineHeight};
		font-size: ${fontSizeDefault};
	}

	a {
		color: ${props => props.theme.link};
	}

	:focus {
		outline-color: ${props => props.theme.outline};
	}

	img {
		vertical-align: middle;
		max-width: 100%;
		width: auto;
		height: auto;
	}

	figure {
		margin: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	ul,
	ol,
	pre {
		margin: 1em 0 0;
		font-weight: inherit;
	}
`}`;

export default GlobalStyles;

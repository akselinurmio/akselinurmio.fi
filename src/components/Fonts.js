import { createGlobalStyle, css } from "styled-components";

const Fonts = createGlobalStyle`${css`
	@font-face {
		font-family: "Calluna";
		font-weight: 400;
		font-style: normal;
		src: local("Calluna"), local("Calluna W03 Regular"),
			url("../fonts/calluna/calluna.woff2") format("woff2"),
			url("../fonts/calluna/calluna.woff") format("woff"),
			url("../fonts/calluna/calluna.ttf") format("truetype");
	}
`}`;

export default Fonts;

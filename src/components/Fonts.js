import { createGlobalStyle, css } from "styled-components";
import CallunaWoff2 from "../fonts/calluna/calluna.woff2";
import CallunaWoff from "../fonts/calluna/calluna.woff";
import CallunaTtf from "../fonts/calluna/calluna.ttf";

const Fonts = createGlobalStyle`${css`
	@font-face {
		font-family: "Calluna";
		font-weight: 400;
		font-style: normal;
		src: local("Calluna"), local("Calluna W03 Regular"),
			url("${CallunaWoff2}") format("woff2"),
			url("${CallunaWoff}") format("woff"),
			url("${CallunaTtf}") format("truetype");
	}
`}`;

export default Fonts;

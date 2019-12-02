import styled from "styled-components"

const VisuallyHidden = styled.div`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`

export default VisuallyHidden

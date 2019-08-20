import React from "react"
import GlobalStyle from "../components/GlobalStyle"
import GlobalContainer from "../components/GlobalContainer"

const MainLayout: React.FunctionComponent = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    <GlobalContainer>{children}</GlobalContainer>
  </React.Fragment>
)

export default MainLayout

import React from "react"
import GlobalStyle from "../components/GlobalStyle"

const MainLayout: React.FunctionComponent = ({ children }) => (
  <React.Fragment>
    <GlobalStyle />
    <div>{children}</div>
  </React.Fragment>
)

export default MainLayout

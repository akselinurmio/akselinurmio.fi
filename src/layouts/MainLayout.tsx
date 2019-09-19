import React, { useState } from "react"
import GlobalStyle from "../components/GlobalStyle"
import Header from "../components/Header"
import { NavigationTargetList, NavigationTarget } from "../types/MenuItem"

const siteName = "Akseli Nurmio"

const menuItems: NavigationTargetList = [
  { title: "Works", url: "/works", isInternalLink: true },
  { title: "About me", url: "/about", isInternalLink: true },
]

const contactButton: NavigationTarget = {
  title: "Send a message",
  url: "/",
  isInternalLink: true,
}

const MainLayout: React.FunctionComponent = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <React.Fragment>
      <GlobalStyle />
      <Header
        siteName={siteName}
        menuItems={menuItems}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuButton={contactButton}
      />
      {children}
    </React.Fragment>
  )
}

export default MainLayout

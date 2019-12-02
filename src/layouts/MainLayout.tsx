import React, { useState } from "react"
import GlobalStyle from "../components/GlobalStyle"
import Header from "../components/Header"
import useSiteMetadata from "../hooks/useSiteMetadata"
import { NavigationTarget, NavigationTargetList } from "../types/MenuItem"

const desktopMenuItems: NavigationTargetList = [
  { title: "Works", url: "/works/", isInternalLink: true },
  { title: "About", url: "/about/", isInternalLink: true },
  { title: "Contact", url: "/contact/", isInternalLink: true },
]
const mobileMenuItems: NavigationTargetList = [
  { title: "Works", url: "/works/", isInternalLink: true },
  { title: "About", url: "/about/", isInternalLink: true },
]

const mobileMenuButton: NavigationTarget = {
  title: "Send me a message",
  url: "/contact/",
  isInternalLink: true,
}

const MainLayout: React.FunctionComponent = ({ children }) => {
  const { name: siteName } = useSiteMetadata()

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <React.Fragment>
      <GlobalStyle />
      <Header
        siteName={siteName}
        desktopMenuItems={desktopMenuItems}
        mobileMenuItems={mobileMenuItems}
        mobileMenuButton={mobileMenuButton}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main aria-label="Page content">{children}</main>
    </React.Fragment>
  )
}

export default MainLayout

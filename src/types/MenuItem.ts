export interface NavigationTarget {
  /** Visible title */
  title: string
  /** Internal or external URL */
  url: string
  /** True if the URL is internal link, false if it's external */
  isInternalLink: boolean
}

export type NavigationTargetList = NavigationTarget[]

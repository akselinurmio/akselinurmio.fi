import React, { FunctionComponent } from "react"

type ExternalLinkProps = React.HTMLProps<HTMLAnchorElement>

const ExternalLink: FunctionComponent<ExternalLinkProps> = props => {
  return <a target="_blank" rel="noopener" {...props} />
}

export default ExternalLink

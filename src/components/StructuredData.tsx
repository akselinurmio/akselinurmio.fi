import React from "react"

interface StructuredDataProps {
  data: Object
}

/**
 * Adds JSON-LD data to a page.
 * @param props.data Any JSON-compatible JSON-LD data.
 */
const StructuredData = ({ data }: StructuredDataProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default StructuredData

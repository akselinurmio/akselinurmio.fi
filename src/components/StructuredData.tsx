import React from "react"

interface StructuredDataProps {
  /** Any JSON-compatible JSON-LD data. */
  data: Object
}

/**
 * Adds JSON-LD data to a page.
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

import React from "react"
import { Thing, WithContext } from "schema-dts"

interface StructuredDataProps {
  /** Any JSON-compatible JSON-LD data. */
  data: WithContext<Thing>
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

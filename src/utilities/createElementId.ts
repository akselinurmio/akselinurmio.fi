let lastId: number = 0

/** Returns application-level unique HTML ID */
export default function createElementId(prefix: string = "id") {
  return `${prefix}${lastId++}`
}

import { Icon } from "../core/types.js"

interface CodepointMap {
  [name: string]: number
}

export function assignCodepoints(
  icons: Icon[],
  existing: CodepointMap = {}
) {

  let next = Math.max(0xe001, ...Object.values(existing)) + 1

  return icons.map(icon => {

    let code = existing[icon.name]

    if (!(icon.name in existing)) {
      code = next++
      existing[icon.name] = code
    }

    return {
      ...icon,
      codepoint: code
    }
  })
}

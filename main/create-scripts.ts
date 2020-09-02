import { toCode } from "./keycode-map"

/** see: https://www.nanoant.com/mac/macos-function-key-remapping-with-hidutil */
/** see: https://stackoverflow.com/a/58981641 */

export type SrcDstMap = { [src: string]: string }

export const scriptSetMapping = (productId: string, mapping: SrcDstMap): string => {
  const mappingStr = Object.keys(mapping).reduce((acc, src) =>
  {
    return `${acc},{"HIDKeyboardModifierMappingSrc":${src},"HIDKeyboardModifierMappingDst":${mapping[src]}}`
  }, '').slice(1).split('\n').join('')

  return `hidutil property --matching {"ProductID":${productId}} --set {"UserKeyMapping":[${mappingStr}]}`
}

export function scriptGetMapping (productId: string) {
  return `hidutil property --matching {"ProductID":${productId}} --get UserKeyMapping`
}

export function scriptClearMapping (productId: string) {
  return `hidutil property --matching '{"ProductID":${productId}}' --set {"UserKeyMapping":[]}`
}

export function parseMapping (mapping: SrcDstMap) {
  return Object.keys(mapping).reduce((acc: SrcDstMap, src: string) => {
    // acc[K[src]] = K[mapping[src]]
    acc[toCode(src)] = toCode(mapping[src])
    return acc
  }, {})
}

/** see: https://stackoverflow.com/a/22046081 */
export function scriptGetKeyboards () {
  return 'system_profiler -json SPUSBDataType'
}

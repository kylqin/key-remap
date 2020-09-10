import { toCode } from "./keycode-map"

/** see: https://www.nanoant.com/mac/macos-function-key-remapping-with-hidutil */
/** see: https://stackoverflow.com/a/58981641 */

export type KeyMapping = { src: string, dst: string }[]

export const scriptSetMapping = (productId: string, mapping: KeyMapping): string => {
  const mappingStr = mapping.reduce((acc, { src, dst }) =>
  {
    return `${acc},{"HIDKeyboardModifierMappingSrc":${src},"HIDKeyboardModifierMappingDst":${dst}}`
  }, '').slice(1).split('\n').join('')

  return `hidutil property --matching {"ProductID":${productId}} --set {"UserKeyMapping":[${mappingStr}]}`
}

export function scriptGetMapping (productId: string) {
  return `hidutil property --matching {"ProductID":${productId}} --get UserKeyMapping`
}

export function scriptClearMapping (productId: string) {
  return `hidutil property --matching '{"ProductID":${productId}}' --set {"UserKeyMapping":[]}`
}

export function parseMapping (mapping: KeyMapping) {
  return mapping.map(({ src, dst }) => {
    return { src: toCode(src), dst: toCode(dst) }
  }, {})
}

/** see: https://stackoverflow.com/a/22046081 */
export function scriptGetKeyboards () {
  return 'system_profiler -json SPUSBDataType'
}

import * as execa from 'execa'
import { parseMapping, scriptClearMapping, scriptGetMapping, scriptSetMapping, SrcDstMap, scriptGetKeyboards } from './create-scripts'
import { getKeys as _getKeys } from './keycode-map'

/**
 * Parse output:
 * RegistryID  Key                   Value
 * 1000004be   UserKeyMapping   (
 *         {
 *         HIDKeyboardModifierMappingDst = 30064771129;
 *         HIDKeyboardModifierMappingSrc = 30064771113;
 *     },
 *         {
 *         HIDKeyboardModifierMappingDst = 30064771113;
 *         HIDKeyboardModifierMappingSrc = 30064771129;
 *     }
 * )
 * 1000004c0   UserKeyMapping   (
 *         {
 *         HIDKeyboardModifierMappingDst = 30064771129;
 *         HIDKeyboardModifierMappingSrc = 30064771113;
 *     },
 *         {
 *         HIDKeyboardModifierMappingDst = 30064771113;
 *         HIDKeyboardModifierMappingSrc = 30064771129;
 *     }
 * )
 * to JSON:
 * [
 *  { src: key1, dst: key2 },
 *  ...
 * ]
 */
function parseKeyMapStdout (stdout: string): { src: string, dst: string}[] {
  // const lines = stdout.split('\n')
  const matches = stdout.match(/[^(]\(([^)]+)\)/m)

  let json = matches[0]
    .replace('(', '[')
    .replace(')', ']')
    .replace(/HIDKeyboardModifierMappingDst/g, '"src"')
    .replace(/HIDKeyboardModifierMappingSrc/g, '"dst"')
    .replace(/ = /g, ':')
    .replace(/\s/mg, '')
    .replace(/;}/g, '}')
    .replace(/;/g, ',')

  if (json === '[null]') {
    json = '[]'
  }

  // console.log(json)
  const result = JSON.parse(json).map(p => ({ src: '0x' + p.src.toString(16), 'dst': '0x' + p.dst.toString(16) }))
  return result
}

export async function clearKeyMapping (keyboardId: string) {
  const script = scriptClearMapping(keyboardId)
  await execa.command(script)
}

export async function getKeyMapping (keyboardId: string) {
  const script = scriptGetMapping(keyboardId)
  const { stdout } = await execa.command(script)
  return parseKeyMapStdout(stdout)
  // return stdout
}

export async function setKeyMapping (keyboardId: string, mapping: SrcDstMap) {
  const script = scriptSetMapping(keyboardId, parseMapping(mapping))
  const { stdout } = await execa.command(script)
  return parseKeyMapStdout(stdout)
  // return stdout
}

export async function getKeys () {
  return Promise.resolve(_getKeys())
}

function parseKeyboardsFromJson (json: string): { name: string, productId: string }[] {
  const obj = JSON.parse(json)
  const keyboards = []

  const collect = (obj) => {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        collect(item)
      }
    } else if (obj) {
      if (/keyboard/i.test(obj._name)) {
        keyboards.push({
          name: obj._name,
          productId: obj.product_id
        })
      }
      if (obj._items) {
        collect(obj._items)
      }
    }
  }

  collect(obj.SPUSBDataType)

  return keyboards
}

export async function getKeyboards () {
  const script = scriptGetKeyboards()
  const { stdout } = await execa.command(script)
  const result = parseKeyboardsFromJson(stdout)
  return result
}

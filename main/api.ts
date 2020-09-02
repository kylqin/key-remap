import * as execa from 'execa'
import { parseMapping, scriptClearMapping, scriptGetMapping, scriptSetMapping, SrcDstMap } from './create-scripts'

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

  const json = matches[0]
    .replace('(', '[')
    .replace(')', ']')
    .replace(/HIDKeyboardModifierMappingDst/g, '"src"')
    .replace(/HIDKeyboardModifierMappingSrc/g, '"dst"')
    .replace(/ = /g, ':')
    .replace(/\s/mg, '')
    .replace(/;}/g, '}')
    .replace(/;/g, ',')

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

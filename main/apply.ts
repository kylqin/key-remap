import './ipc'
import { registerCommand } from "./commands";
import { CommandAction } from "../shared/types";
import { getKeyboards, getKeyMapping, setKeyMapping, clearKeyMapping, getKeys } from './api';


registerCommand('list-keys', async (action: CommandAction) => {
  return await getKeys()
})

registerCommand('list-keyboards', async (action: CommandAction) => {
  return await getKeyboards()
})

registerCommand('list-key-mapping', async (action: CommandAction) => {
  return await getKeyMapping(action.payload.keyboardId)
})

registerCommand('clear-key-mapping', async (action: CommandAction) => {
  return await clearKeyMapping(action.payload.keyboardId)
})

registerCommand('save-key-mapping', async (action: CommandAction) => {
  const { keyboardId, mapping } = action.payload
  return await setKeyMapping(keyboardId, mapping)
})

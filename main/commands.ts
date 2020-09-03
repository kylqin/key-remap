import { CommandAction } from '../shared/types'

type Command = (action: CommandAction) => Promise<any>

const commandMap: Map<string, Command> = new Map()

export async function execCommand (action: CommandAction): Promise<any> {
  const command = commandMap.get(action.name)
  if (!command) {
    console.error(`Command is not existed for ${action.name}!!`)
  } else {
    return await command(action)
  }
}

export function registerCommand (name: string, command: Command) {
  if (commandMap.has(name)) {
    console.warn(`command ${name} has registered already`)
  }
  commandMap.set(name, command)
  console.log(`command ${name} registered successfully`)
}

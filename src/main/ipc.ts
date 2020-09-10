// 在主进程中.
import { ipcMain } from 'electron'
import { execCommand } from './commands'
import { CommandAction } from '@common/types'

ipcMain.on('command', async (event, action: CommandAction) => {
  console.log(action) // prints "ping"
  const actionResult = await execCommand(action)
  event.reply('command-reply', actionResult, action)
})

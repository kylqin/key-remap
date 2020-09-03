import { Injectable } from "@angular/core";
import { ipcRenderer } from 'electron';
import { CommandAction } from "../../../../../shared/types";

export type CommandReplyListener = (result: any) => void

@Injectable({
  providedIn: 'root'
})
export class IcpService {
  static actionId: number = 0

  ipcRenderer: typeof ipcRenderer

  private replyListeners: Map<number, CommandReplyListener> = new Map()

  private listenCommandReply (action: CommandAction, reslove: (value?: unknown) => void, reject: (reason?: unknown) => void) {
    const listener = (result: any) => {
      reslove(result)
      this.replyListeners.delete(action.id)
    }
    this.replyListeners.set(action.id, listener)
  }

  private newActionId () {
    IcpService.actionId += 1
    return IcpService.actionId
  }

  constructor() {
    if (!!(window && window.process && window.process.type)) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcRenderer.on('command-reply', (event, reply, action) => {
        // console.log('event, reply, action')
        // console.log(event, reply, action)
        const listener = this.replyListeners.get(action.id)
        if (listener) {
          listener(reply)
        }
      })
    }
  }

  async command<T>(name: string, payload: { [key: string]: any } = {} ): Promise<T> {
    const action: CommandAction = {
      id: this.newActionId(),
      name,
      payload
    }
    return new Promise((resolve, reject) => {
      this.listenCommandReply(action, resolve, reject)
      this.ipcRenderer.send('command', action)
    })
  }
}

import { Injectable } from '@angular/core';
import { IpcService } from '../core/services/ipc/ipc.service';
import { Observable, Subscriber, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemappingService {
  public keyboardsObservable: Subject<any[]> = new BehaviorSubject<any[]>([])
  public keysObservable: Subject<any[]> = new BehaviorSubject<any[]>([])
  public mappingsObservable: Subject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private ipcService: IpcService) {}

  async pullKeyboards () {
    const keyboards = await this.ipcService.command<any[]>('list-keyboards')
    this.keyboardsObservable.next(keyboards)
  }

  async pullKeys () {
    const keys = await this.ipcService.command<any[]>('list-keys')
    this.keysObservable.next(keys)
  }

  async pullMappings (keyboardId: string) {
    const mappings = await this.ipcService.command<any[]>('list-key-mapping', { keyboardId })
    this.mappingsObservable.next(mappings)
  }

  async getKeybaords() {
    return await this.ipcService.command<any[]>('list-keyboards')
  }

  async getKeys () {
    return await this.ipcService.command<any[]>('list-keys')
  }

  async getMappings (keyboardId: string) {
    return await this.ipcService.command<any[]>('list-key-mapping', { keyboardId })
  }

  async saveMappings (keyboardId: string, mapping: any[]) {
    const mappings = await this.ipcService.command('save-key-mapping', {
      keyboardId,
      mapping
    })

    console.log('mappings ->', mappings)
  }
}

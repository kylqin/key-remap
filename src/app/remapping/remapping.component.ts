import { Component, OnInit } from '@angular/core';
import { IcpService } from '../core/services/ipc/ipc.service';

@Component({
  selector: 'app-remapping',
  templateUrl: './remapping.component.html',
  styleUrls: ['./remapping.component.scss']
})
export class RemappingComponent implements OnInit {

  keyboards = []

  private _targetKeyboard: string = ''
  get targetKeyboard () { return this._targetKeyboard }
  set targetKeyboard (kb) {
    this._targetKeyboard = kb
    this.getKeyMapping()
  }

  mapping = [
    // { src: 'mm', dst: 'MM' },
  ]

  keys = [
    // { value: 'x', title: 'X' },
  ]

  constructor(private ipcService: IcpService) { }

  ngOnInit(): void {
    console.log('remapping on init')
    this.loadData()
  }

  async loadData () {
    const keyboards = await this.ipcService.command<any[]>('list-keyboards')
    console.log('keyboards ->', keyboards)
    this.keyboards = keyboards
    this.targetKeyboard =  keyboards[1] ? keyboards[1].productId : ''

    const keys = await this.ipcService.command<any[]>('list-keys')
    console.log('keys ->', keys)
    this.keys = keys

    this.mapping = await this.ipcService.command<any[]>('list-key-mapping', { keyboardId: this.targetKeyboard })
    console.log('mapping ->', this.mapping)
  }

  async getKeyMapping () {
    this.mapping = await this.ipcService.command<any[]>('list-key-mapping', { keyboardId: this.targetKeyboard })
  }

  addMapping () {
    console.log('plus button clicked')
    this.mapping = this.mapping.concat([{ src: '', dst: '' }])
  }

  deleteMappinh (index: number) {
    this.mapping = this.mapping.filter((m, i) => i !== index)
  }

  saveMapping () {
    this.ipcService.command('save-key-mapping', {
      keyboardId: this.targetKeyboard,
      mapping: this.mapping
    })
  }
}

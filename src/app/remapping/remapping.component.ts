import { Component, OnInit } from '@angular/core';
import { IpcService } from '../core/services/ipc/ipc.service';
import { RemappingService } from './remapping.service';
import { Subscription } from 'rxjs';

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
    this.remappingService.pullMappings(kb)
  }

  mappings = [
    // { src: 'mm', dst: 'MM' },
  ]

  keys = [
    // { value: 'x', title: 'X' },
  ]

  private mappingsSubscription: Subscription
  private keyboardsSubscription: Subscription
  private keysSubscription: Subscription

  constructor(private remappingService: RemappingService) {
    this.mappingsSubscription = this.remappingService.mappingsObservable.subscribe((mappings: any[]) => {
      this.mappings = mappings
    })

    this.keyboardsSubscription = this.remappingService.keyboardsObservable.subscribe({
      next: (keyboards: any[]) => {
        // console.log('keyboards -> ', keyboards)
        this.keyboards = keyboards
        this.targetKeyboard =  keyboards[1] ? keyboards[1].productId : ''
      }
    })
    this.remappingService.pullKeyboards()

    this.keysSubscription = this.remappingService.keysObservable.subscribe({
      next: (keys: any[]) => { this.keys = keys }
    })
    this.remappingService.pullKeys()
   }

  ngOnDestroy(): void {
    this.mappingsSubscription.unsubscribe()
    this.keyboardsSubscription.unsubscribe()
    this.keysSubscription.unsubscribe()
  }

  addMapping () {
    this.mappings = this.mappings.concat([{ src: '', dst: '' }])
  }

  deleteMapping (index: number) {
    this.mappings = this.mappings.filter((m, i) => i !== index)
  }

  saveMappings () {
    this.remappingService.saveMappings(this.targetKeyboard, this.mappings)
  }
}

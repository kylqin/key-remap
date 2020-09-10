import { Injectable } from '@angular/core';
import { IpcService } from '../core/services/ipc/ipc.service';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '@common/types';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  public profilesObservable = new BehaviorSubject<any[]>([])

  constructor(private ipcService: IpcService) { }

  pullProfiles () {
    const profiles: Profile[] = [
      {
        name: 'Default',
        mappings: {
        }
      }
    ]

    this.profilesObservable.next(profiles)
  }

  saveProfiles(profiles: Profile[]) {
    this.ipcService.command('save-profiles', profiles)
  }
}

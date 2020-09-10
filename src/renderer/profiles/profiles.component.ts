import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfilesService } from './profiles.service';
import { Profile } from '@common/types';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  public profiles: Profile[] = []

  private profilesSubscription: Subscription

  constructor(private profilesService: ProfilesService) { }

  ngOnInit(): void {
    this.profilesSubscription = this.profilesService.profilesObservable.subscribe((profiles: Profile[]) => {
      this.profiles = profiles
    })
    this.profilesService.pullProfiles()
  }

  addProfile() {
    this.profiles = this.profiles.concat([{ name: 'New Profile', mappings: {} }])
  }

  deleteProfile(index: number) {
    this.profiles = this.profiles.filter((p, i) => i !== index)
  }

  saveProfiles() {
    this.profilesService.saveProfiles(this.profiles)
  }

}

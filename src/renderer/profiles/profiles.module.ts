import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './profiles.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfilesModule { }

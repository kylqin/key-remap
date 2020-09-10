import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemappingComponent } from './remapping.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [RemappingComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RemappingModule { }

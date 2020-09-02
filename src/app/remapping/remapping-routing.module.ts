import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RemappingComponent } from './remapping.component';

const routes: Routes = [
  {
    path: 'remapping',
    component: RemappingComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemappingRoutingModule {}


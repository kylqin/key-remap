import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
import { RemappingRoutingModule } from './remapping/remapping-routing.module';
import { ProfilesRoutingModule } from './profiles/profiles-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    DetailRoutingModule,
    RemappingRoutingModule,
    ProfilesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

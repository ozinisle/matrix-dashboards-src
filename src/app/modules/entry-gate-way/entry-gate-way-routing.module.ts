import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {
  AuthenticatedContentLayoutComponent
} from '../../shared/components/authenticated-content-layout/authenticated-content-layout.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AuthenticatedContentLayoutComponent,
    children: [{
      path: '',
      component: LandingPageComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryGateWayRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocLandingPageComponent } from './poc-landing-page/poc-landing-page.component';
import {
  AuthenticatedContentLayoutComponent
} from '../../shared/components/authenticated-content-layout/authenticated-content-layout.component';
import {
  TypeAHeadImageSearchPerformanceComponent
} from './type-a-head-image-search-performance/type-a-head-image-search-performance.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AuthenticatedContentLayoutComponent,
    children: [
      {
        path: '',
        component: PocLandingPageComponent
      },
      {
        path: 'fast-image-search',
        component: TypeAHeadImageSearchPerformanceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProofOfConceptsRoutingModule { }

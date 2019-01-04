import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocLandingPageComponent } from './poc-landing-page/poc-landing-page.component';
import {
  AuthenticatedContentLayoutComponent
} from '../../shared/components/authenticated-content-layout/authenticated-content-layout.component';
import {
  TypeAHeadImageSearchPerformanceComponent
} from './type-a-head-image-search-performance/type-a-head-image-search-performance.component';
import { D3AngluarComponent } from './d3-angluar/d3-angluar.component';
import { HtmlWebWorkerComponent } from './html-web-worker/html-web-worker.component';
import { AngularD3StaticSunBurstComponent } from './angular-d3-static-sun-burst/angular-d3-static-sun-burst.component';
import { AngularD3ResponsiveChartComponent } from './angular-d3-responsive-chart/angular-d3-responsive-chart.component';
import { PocLandingPageResolver } from './poc-landing-page/poc-landing-page.resolver';
import { ServeStaticContentComponent } from './serve-static-content/serve-static-content.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AuthenticatedContentLayoutComponent,
    children: [
      {
        path: '',
        component: PocLandingPageComponent,

        resolve: {
          pocLandingPageData: PocLandingPageResolver
        },
      },
      {
        path: 'fast-image-search',
        component: TypeAHeadImageSearchPerformanceComponent
      },
      {
        path: 'd3-dynamic-chart',
        component: D3AngluarComponent
      },
      {
        path: 'd3-static-chart',
        component: AngularD3StaticSunBurstComponent
      },
      {
        path: 'd3-responsive-chart',
        component: AngularD3ResponsiveChartComponent
      },
      {
        path: 'serve-static-html-content',
        component: ServeStaticContentComponent
      },
      {
        path: `html-web-worker`,
        component: HtmlWebWorkerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProofOfConceptsRoutingModule { }

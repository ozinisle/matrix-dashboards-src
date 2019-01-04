import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofOfConceptsRoutingModule } from './proof-of-concepts-routing.module';
import { PocLandingPageComponent } from './poc-landing-page/poc-landing-page.component';
import {
  TypeAHeadImageSearchPerformanceComponent
} from './type-a-head-image-search-performance/type-a-head-image-search-performance.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { D3AngluarComponent } from './d3-angluar/d3-angluar.component';
import { HtmlWebWorkerComponent } from './html-web-worker/html-web-worker.component';
import { AngularD3StaticSunBurstComponent } from './angular-d3-static-sun-burst/angular-d3-static-sun-burst.component';
import { AngularD3ResponsiveChartComponent } from './angular-d3-responsive-chart/angular-d3-responsive-chart.component';
import { PocLandingPageResolver } from './poc-landing-page/poc-landing-page.resolver';
import { PocLandingPageService } from './poc-landing-page/poc-landing-page.service';
import { ServeStaticContentComponent } from './serve-static-content/serve-static-content.component';

@NgModule({
  declarations: [
    PocLandingPageComponent,
    TypeAHeadImageSearchPerformanceComponent,
    D3AngluarComponent,
    HtmlWebWorkerComponent,
    AngularD3StaticSunBurstComponent,
    AngularD3ResponsiveChartComponent,
    ServeStaticContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProofOfConceptsRoutingModule
  ],
  providers: [
    PocLandingPageResolver,
    PocLandingPageService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProofOfConceptsModule { }

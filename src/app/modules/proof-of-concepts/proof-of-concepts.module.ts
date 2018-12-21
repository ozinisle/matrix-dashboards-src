import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofOfConceptsRoutingModule } from './proof-of-concepts-routing.module';
import { PocLandingPageComponent } from './poc-landing-page/poc-landing-page.component';
import {
  TypeAHeadImageSearchPerformanceComponent
} from './type-a-head-image-search-performance/type-a-head-image-search-performance.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PocLandingPageComponent,
    TypeAHeadImageSearchPerformanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProofOfConceptsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProofOfConceptsModule { }

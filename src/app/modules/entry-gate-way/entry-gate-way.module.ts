import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryGateWayRoutingModule } from './entry-gate-way-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    EntryGateWayRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EntryGateWayModule { }

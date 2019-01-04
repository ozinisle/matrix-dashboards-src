import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedContentLayoutComponent } from './components/authenticated-content-layout/authenticated-content-layout.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatrixFooterComponent } from './components/matrix-footer/matrix-footer.component';
import { MatrixHeaderComponent } from './components/matrix-header/matrix-header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {
  UnauthenticatedContentLayoutComponent
} from './components/unauthenticated-content-layout/unauthenticated-content-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatrixResponsiveHorizontalMenuComponent
} from './components/matrix-responsive-horizontal-menu/matrix-responsive-horizontal-menu.component';
import { AlertComponent } from './directives/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MultiValueFieldComponent } from './components/multi-value-field/multi-value-field.component';
import { MaterialModule } from './material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HTMLLinkPipe } from './pipes/htmlUtilityPipes/html-link.pipe';

@NgModule({
  declarations: [
    MatrixHeaderComponent,
    MatrixFooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticatedContentLayoutComponent,
    UnauthenticatedContentLayoutComponent,
    MatrixResponsiveHorizontalMenuComponent,
    AlertComponent,
    PageNotFoundComponent,
    MultiValueFieldComponent,

    HTMLLinkPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InfiniteScrollModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InfiniteScrollModule,

    MatrixHeaderComponent,
    MatrixFooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticatedContentLayoutComponent,
    UnauthenticatedContentLayoutComponent,
    MatrixResponsiveHorizontalMenuComponent,
    AlertComponent,
    PageNotFoundComponent,
    MultiValueFieldComponent,

    HTMLLinkPipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }

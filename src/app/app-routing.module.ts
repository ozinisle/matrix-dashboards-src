import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './modules/entry-gate-way/entry-gate-way.module#EntryGateWayModule'
  },
  {
    path: 'poc',
    loadChildren: './modules/proof-of-concepts/proof-of-concepts.module#ProofOfConceptsModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

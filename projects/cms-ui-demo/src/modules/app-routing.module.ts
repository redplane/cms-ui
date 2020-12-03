import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterLayoutComponent} from './master-layout/master-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./landing/landing-page.module').then(m => m.LandingPageModule)
      },
      {
        path: 'spinner-demo',
        loadChildren: () => import('./spinner-demo/spinner-demo.module').then(m => m.SpinnerDemoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

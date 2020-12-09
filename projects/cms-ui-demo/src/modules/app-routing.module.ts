import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MasterLayoutComponent} from './master-layout/master-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'spinner-demo',
        loadChildren: () => import('./spinner-demo/spinner-demo.module').then(m => m.SpinnerDemoModule)
      },
      {
        path: 'banner-demo',
        loadChildren: () => import('./banner-demo/banner-demo.module').then(m => m.BannerDemoModule)
      },
      {
        path: 'validation-summarizer-demo',
        loadChildren: () => import('./validation-summarizer-demo/validation-summarizer-demo.module')
          .then(m => m.ValidationSummarizerDemoModule)
      },
      {
        path: 'dialog-demo',
        loadChildren: () => import('./dialog-demo/dialog-demo.module').then(m => m.DialogDemoModule)
      },
      {
        path: '',
        loadChildren: () => import('./landing/landing-page.module').then(m => m.LandingPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

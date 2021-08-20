import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
        path: 'smart-navigator-demo',
        loadChildren: () => import('./smart-navigator-demo/smart-navigator-demo.module')
          .then(m => m.SmartNavigatorDemoModule)
      },
      {
        path: 'sentinel-demo',
        loadChildren: () => import('./sentinel-demo/sentinel-demo.module')
          .then(m => m.SentinelDemoModule)
      },
      {
        path: '',
        loadChildren: () => import('./landing/landing-page.module').then(m => m.LandingPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

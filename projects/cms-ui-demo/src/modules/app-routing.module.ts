import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterLayoutComponent} from './master-layout/master-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'ui-module',
        loadChildren: () => import('./pages/ui-module-page/ui-module-page.module')
          .then(m => m.UiModulePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)
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

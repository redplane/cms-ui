import {NgModule} from '@angular/core';
import {UiModulePageComponent} from './ui-module-page.component';
import {RouterModule, Routes} from '@angular/router';
import {UiModulePageGuard} from '../../../guards/ui-module-page.guard';

const routes: Routes = [
  {
    path: ':id',
    component: UiModulePageComponent,
    canActivate: [UiModulePageGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UiModulePageRoutingModule {

}

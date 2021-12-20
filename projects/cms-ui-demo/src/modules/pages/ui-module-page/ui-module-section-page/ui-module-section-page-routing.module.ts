import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UiModuleSectionPageComponent} from './ui-module-section-page.component';

const routes: Routes = [
  {
    path: '',
    component: UiModuleSectionPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UiModuleSectionPageRoutingModule {

}

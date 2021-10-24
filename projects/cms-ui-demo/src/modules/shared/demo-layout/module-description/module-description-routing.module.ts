import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModuleDescriptionComponent} from './module-description.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleDescriptionComponent
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
export class ModuleDescriptionRoutingModule {

  //#region Methods

  //#endregion
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VsmWithVisibilityHandlerComponent} from './vsm-with-visibility-handler.component';

const routes: Routes = [
  {
    path: '',
    component: VsmWithVisibilityHandlerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VsmWithVisibilityHandlerRoutingModule {

}

import {RouterModule, Routes} from '@angular/router';
import {VsmWithTemplateComponent} from './vsm-with-template.component';
import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: VsmWithTemplateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class VsmWithTemplateRoutingModule {

}

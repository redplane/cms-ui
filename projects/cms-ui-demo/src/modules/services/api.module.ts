import {NgModule} from '@angular/core';
import {CATEGORY_SERVICE, DEMO_MODULE_SERVICE} from '../../constants/injectors';
import {DemoModuleService} from '../../services/implementations/demo-module.service';
import {HttpClientModule} from '@angular/common/http';
import {CategoryService} from '../../services/implementations/category.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: DEMO_MODULE_SERVICE,
      useClass: DemoModuleService
    },
    {
      provide: CATEGORY_SERVICE,
      useClass: CategoryService
    }
  ]
})
export class ApiModule {
}

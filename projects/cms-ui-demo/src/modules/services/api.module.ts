import {NgModule} from '@angular/core';
import {
  APP_SETTINGS_SERVICE,
  CATEGORY_SERVICE,
  ENDPOINT_RESOLVER, SECTION_SERVICE,
  UI_MODULE_SERVICE
} from '../../constants/injectors';
import {SectionService} from '../../services/implementations/section.service';
import {HttpClientModule} from '@angular/common/http';
import {CategoryService} from '../../services/implementations/category.service';
import {EndpointResolver} from '../../services/implementations/endpoint.resolver';
import {UiModuleService} from '../../services/implementations/ui-module.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: ENDPOINT_RESOLVER,
      useClass: EndpointResolver,
      deps: [APP_SETTINGS_SERVICE]
    },
    {
      provide: SECTION_SERVICE,
      useClass: SectionService
    },
    {
      provide: CATEGORY_SERVICE,
      useClass: CategoryService
    },
    {
      provide: UI_MODULE_SERVICE,
      useClass: UiModuleService
    }
  ]
})
export class ApiModule {
}

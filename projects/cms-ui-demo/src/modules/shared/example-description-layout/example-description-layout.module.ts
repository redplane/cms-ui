import {ModuleWithProviders, NgModule} from '@angular/core';
import {ExampleDescriptionLayoutComponent} from './example-description-layout.component';
import {ToTrustedHtmlPipeModule} from '@cms-ui/core';
import {ExampleDescriptionLayoutOption} from './example-description-layout-option';
import {EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER} from '../../../constants/injection-token.constant';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ToTrustedHtmlPipeModule
  ],
  declarations: [
    ExampleDescriptionLayoutComponent
  ],
  exports: [
    ExampleDescriptionLayoutComponent
  ]
})
export class ExampleDescriptionLayoutModule {

  //#region Methods

  public static withOptions(option: ExampleDescriptionLayoutOption): ModuleWithProviders<ExampleDescriptionLayoutModule> {
    return {
      ngModule: ExampleDescriptionLayoutModule,
      providers: [
        {
          provide: EXAMPLE_DEMO_DESCRIPTION_MODULE_NAME_PROVIDER,
          useValue: option.moduleName
        }
      ]
    }
  }

  //#endregion
}

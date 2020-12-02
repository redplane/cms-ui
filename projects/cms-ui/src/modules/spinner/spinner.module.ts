import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {SpinnerComponent} from './spinner.component';
import {CommonModule} from '@angular/common';
import {SPINNER_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {

  //#region Methods

  public static forRoot(instance: Type<ISpinnerService>): ModuleWithProviders<SpinnerModule> {
    return {
      ngModule: SpinnerModule,
      providers: [
        {
          provide: SPINNER_SERVICE_PROVIDER,
          useClass: instance
        }
      ]
    };
  }

  //#endregion

}

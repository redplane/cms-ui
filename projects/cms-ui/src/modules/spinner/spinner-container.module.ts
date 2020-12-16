import {Injector, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {SpinnerContainerComponent} from './spinner-container.component';
import {CommonModule} from '@angular/common';
import {SPINNER_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';
import {BasicSpinnerService} from '../../services';

export function basicSpinnerFactory(): ISpinnerService {
  return new BasicSpinnerService();
}

@NgModule({
  declarations: [
    SpinnerContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerContainerComponent
  ]
})
export class SpinnerContainerModule {

  //#region Methods

  public static forRoot(): ModuleWithProviders<SpinnerContainerModule> {
    return {
      ngModule: SpinnerContainerModule,
      providers: [
        {
          provide: SPINNER_SERVICE_PROVIDER,
          useFactory: basicSpinnerFactory
        }
      ]
    };
  }

  //#endregion

}

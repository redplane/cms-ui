import {Injector, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {SpinnerContainerComponent} from './spinner-container.component';
import {CommonModule} from '@angular/common';
import {SPINNER_SERVICE_PROVIDER} from '../../constants/injectors';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';
import {BasicSpinnerComponent} from './basic-spinner/basic-spinner.component';
import {SpinnerService} from '../../services/implementations/spinner.service';

export function basicSpinnerFactory(): ISpinnerService {
  return new SpinnerService();
}

@NgModule({
  declarations: [
    SpinnerContainerComponent,
    BasicSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerContainerComponent,
    BasicSpinnerComponent
  ],
  entryComponents: [
    BasicSpinnerComponent
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

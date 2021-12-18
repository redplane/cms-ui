import {Injector, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {SpinnerContainerComponent} from './spinner-container.component';
import {CommonModule} from '@angular/common';
import {SPINNER_SERVICE} from '../../constants/injectors/injectors';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';
import {BasicSpinnerComponent} from './basic-spinner/basic-spinner.component';
import {WINDOW_PROVIDERS} from '../../services/implementations/window.service';
import {SpinnerService} from '../../services/implementations/spinners/spinner.service';

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
  providers: [
    WINDOW_PROVIDERS
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
          provide: SPINNER_SERVICE,
          useFactory: basicSpinnerFactory
        }
      ]
    };
  }

  //#endregion

}

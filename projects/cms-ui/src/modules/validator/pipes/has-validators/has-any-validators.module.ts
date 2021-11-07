import {ModuleWithProviders, NgModule} from '@angular/core';
import {HasAnyValidatorsPipe} from './has-any-validators.pipe';
import {HAS_ANY_VALIDATOR_SERVICE} from '../../../../constants/injectors/internal-injectors';
import {buildHasAnyValidatorService} from '../../../../factories/has-any-validators-pipe.factory';

@NgModule({
  declarations: [
    HasAnyValidatorsPipe
  ],
  exports: [
    HasAnyValidatorsPipe
  ]
})
export class HasAnyValidatorsModule {

  //#region Methods

  public static forRoot(): ModuleWithProviders<HasAnyValidatorsModule> {
    return {
      ngModule: HasAnyValidatorsModule,
      providers: [
        {
          provide: HAS_ANY_VALIDATOR_SERVICE,
          useFactory: buildHasAnyValidatorService,
          multi: false
        }
      ]
    };
  }

  //#endregion
}

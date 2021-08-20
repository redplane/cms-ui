import {Injector, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {MeetRequirementDirective} from './meet-requirement.directive';
import {MeetRequirementService} from './meet-requirement.service';
import {MEET_REQUIREMENT_SERVICE_PROVIDER} from '../../../constants';

@NgModule({
  declarations: [
    MeetRequirementDirective
  ],
  exports: [
    MeetRequirementDirective
  ]
})
export class MeetRequirementModule {

  //#region Methods

  public static forRoot(): ModuleWithProviders<MeetRequirementModule> {
    return {
      ngModule: MeetRequirementModule,
      providers: [
        {
          provide: MEET_REQUIREMENT_SERVICE_PROVIDER,
          useClass: MeetRequirementService,
          deps: [
            Injector
          ]
        }
      ]
    };
  }

  public static withRequirementHandlers(providers: Provider[]): ModuleWithProviders<MeetRequirementModule> {
      return {
        ngModule: MeetRequirementModule,
        providers
      };
  }

  //#endregion
}

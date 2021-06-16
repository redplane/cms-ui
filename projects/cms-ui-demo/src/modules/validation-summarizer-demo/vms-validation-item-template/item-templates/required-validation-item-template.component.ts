import {Component, Inject} from '@angular/core';
import {ValidationItemBuildContext} from '@cms-ui/core';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'required-validation-item-template',
  template: `<b>(External component)</b> <span class="text-danger">{{validationMessageContext.label}} is required</span>`
})
export class RequiredValidationItemTemplateComponent {

  //#region Constructor

  public constructor(
    @Inject(VALIDATION_ITEM_CONTEXT_PROVIDER) public readonly validationMessageContext: ValidationItemBuildContext) {
  }

  //#endregion
}

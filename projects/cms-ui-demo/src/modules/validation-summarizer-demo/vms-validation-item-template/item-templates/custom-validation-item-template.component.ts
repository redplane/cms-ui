import {Component, Inject} from '@angular/core';
import {ValidationItemBuildContext} from '@cms-ui/core';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'custom-validation-item',
  template: `<b>(Custom validation)</b> <span class="text-danger">{{validationMessageContext.validationMessage?.content}}</span>`,
  styleUrls: ['custom-validation-item-template.component.scss']
})
export class CustomValidationItemTemplateComponent {

  //#region Constructor

  public constructor(
    @Inject(VALIDATION_ITEM_CONTEXT_PROVIDER) public readonly validationMessageContext: ValidationItemBuildContext) {
  }

  //#endregion
}

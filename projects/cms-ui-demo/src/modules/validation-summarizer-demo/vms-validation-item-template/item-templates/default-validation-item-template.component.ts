import {Component, Inject} from '@angular/core';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';
import {ValidationItemBuildContext} from '@cms-ui/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'default-validation-item',
  template: `<b class="text-danger fa fa-times"></b>&nbsp;<span class="text-danger">{{validationMessageContext?.validationMessage?.content}}</span>`,
  styleUrls: ['default-validation-item-template.component.scss']
})
export class DefaultValidationItemTemplateComponent {

  //#region Properties

  //#endregion

  //#region Constructor

  public constructor(@Inject(VALIDATION_ITEM_CONTEXT_PROVIDER) public readonly validationMessageContext: ValidationItemBuildContext) {
  }

  //#endregion

  //#region Methods

  //#endregion
}

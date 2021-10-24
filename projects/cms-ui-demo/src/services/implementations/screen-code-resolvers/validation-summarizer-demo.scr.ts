import {DefaultScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ValidationSummarizerDemoScreenCodes} from '../../../constants/screen-codes/validation-summarizer-demo-screen-codes';

@Injectable()
export class ValidationSummarizerDemoScr extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [code: string]: string } = {};
    codeToUrl[ValidationSummarizerDemoScreenCodes.withMessageTemplate] = '/validation-summarizer-demo/message-template';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withVisibilityHandler] = '/validation-summarizer-demo/visibility-handler';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withTemplateDriven] = '/validation-summarizer-demo/template-driven';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withCustomValidator] = '/validation-summarizer-demo/custom-validator';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withChildValidatorModule] = '/validation-summarizer-demo/child-validator-module';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withValidationItemTemplate] = '/validation-summarizer-demo/validation-item-template';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withBasicValidator] = '/validation-summarizer-demo/basic-validator';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withModuleDescription] = '/validation-summarizer-demo';
    codeToUrl[ValidationSummarizerDemoScreenCodes.withApi] = '/validation-summarizer-demo/api';
    super(codeToUrl);
  }

  //#endregion

}

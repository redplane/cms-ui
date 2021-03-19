import {DefaultScreenCodeResolver} from '@cms-ui/core';
import {Injectable} from '@angular/core';
import {ValidationSummarizerDemoScreenCodeConstant} from '../../../constants/screen-codes/validation-summarizer-demo-screen-code.constant';

@Injectable()
export class ValidationSummarizerDemoScreenCodeResolver extends DefaultScreenCodeResolver {

  //#region Constructor

  public constructor() {

    const codeToUrl: { [code: string]: string } = {};
    codeToUrl[ValidationSummarizerDemoScreenCodeConstant.withMessageTemplate] = '/validation-summarizer-demo/message-template';
    codeToUrl[ValidationSummarizerDemoScreenCodeConstant.withVisibilityHandler] = '/validation-summarizer-demo/visibility-handler';
    codeToUrl[ValidationSummarizerDemoScreenCodeConstant.withTemplateDriven] = '/validation-summarizer-demo/template-driven';
    codeToUrl[ValidationSummarizerDemoScreenCodeConstant.withCustomValidator] = '/validation-summarizer-demo/custom-validator';
    codeToUrl[ValidationSummarizerDemoScreenCodeConstant.withBasicValidator] = '/validation-summarizer-demo';
    super(codeToUrl);
  }

  //#endregion

}

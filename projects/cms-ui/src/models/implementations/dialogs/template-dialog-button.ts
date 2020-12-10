import {IDialogButton} from '../../interfaces/dialogs/dialog-button.interface';
import {TemplateRef} from '@angular/core';
import { HtmlContent } from '../../html-content';

export class TemplateDialogButton implements IDialogButton {

  //#region Properties

  public content: string | HtmlContent | TemplateRef<any>;

  //#endregion

  //#region Constructor

  public constructor(content: TemplateRef<any>) {
    this.content = content;
  }

  //#endregion

}

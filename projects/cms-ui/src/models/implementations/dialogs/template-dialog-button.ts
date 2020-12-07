import {IDialogButton} from '../../interfaces/dialogs/dialog-button.interface';
import {HtmlContent} from '@cms-ui/core';
import {TemplateRef} from '@angular/core';

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

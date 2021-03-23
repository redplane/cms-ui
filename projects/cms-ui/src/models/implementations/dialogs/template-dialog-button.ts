import {IDialogButton} from '../../interfaces/dialogs/dialog-button.interface';
import {TemplateRef} from '@angular/core';

export class TemplateDialogButton implements IDialogButton {

  //#region Properties

  public content: TemplateRef<any>;

  //#endregion

  //#region Constructor

  public constructor(content: TemplateRef<any>) {
    this.content = content;
  }

  //#endregion

}

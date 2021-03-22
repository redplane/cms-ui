import {IDialogSettings} from '../../interfaces/dialogs/dialog-settings.interface';
import {IDialogButton} from '../../interfaces';
import {HtmlContent} from '../../html-content';
import {TemplateRef} from '@angular/core';
import {DialogKindConstant} from '../../../constants/dialog-kind.constant';

export class ConfirmationDialogSettings implements IDialogSettings {

  public buttons?: IDialogButton[];

  readonly kind: string;

  public message: string | HtmlContent | TemplateRef<any>;

  public title?: string | HtmlContent | TemplateRef<any>;

  //#region Constructor

  public constructor(message: string | HtmlContent | TemplateRef<any>,
                     title?: string | HtmlContent | TemplateRef<any>,
                     buttons?: IDialogButton[]) {
    this.kind = DialogKindConstant.confirmation;

    this.message = message;
    this.title = title;
    this.buttons = buttons;
  }

  //#endregion

}

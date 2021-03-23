import {IDialogSettings} from '../../interfaces/dialogs/dialog-settings.interface';
import {HtmlContent} from '../../html-content';
import {TemplateRef} from '@angular/core';
import {DialogKindConstant} from '../../../constants/dialog-kind.constant';

// tslint:disable-next-line:no-empty-interface
export class InfoDialogSettings implements IDialogSettings {

  //#region Properties

  public readonly kind: string;

  public message: string | HtmlContent | TemplateRef<any>;

  public icon?: HtmlContent | TemplateRef<any>;

  //#region

  //#region Constructor

  public constructor(message: string | HtmlContent | TemplateRef<any>) {
    this.kind = DialogKindConstant.info;
    this.message = message;
  }

  //#endregion
}

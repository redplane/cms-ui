import {HtmlContent, IDialogButton, IDialogSettings} from '@cms-ui/core';
import {TemplateRef} from '@angular/core';
import {DialogKindConstant} from '../../constants/dialog-kind.constant';

export class BasicDialogSetting implements IDialogSettings {

  //#region Properties

  public readonly kind: string;

  public backdropClasses: string[];

  public buttons: IDialogButton[];

  public dialogClasses: string[];

  public disableClose: boolean;

  public height: string;

  public maxHeight: string | undefined;

  public maxWidth: string | undefined;

  public message: string | HtmlContent | TemplateRef<any>;

  public minHeight: string | undefined;

  public minWidth: string | undefined;

  public title: string | HtmlContent | TemplateRef<any>;

  public width: string;

  public centered: boolean;

  //#endregion


  //#region Constructor

  public constructor() {
    this.kind = DialogKindConstant.basic;
    this.backdropClasses = [];
    this.buttons = [];
    this.dialogClasses = [];
    this.disableClose = false;
    this.height = 'auto';
    this.maxHeight = undefined;
    this.maxWidth = undefined;
    this.message = '';
    this.minHeight = undefined;
    this.minWidth = undefined;
    this.title = '';
    this.width = 'auto';
    this.centered = false;
  }

  //#endregion

}

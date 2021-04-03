import {IDialogSettings} from '../../interfaces/dialogs/dialog-settings.interface';
import {HtmlContent} from '../../html-content';
import {Injector, TemplateRef} from '@angular/core';
import {DialogKindConstant} from '../../../constants/dialog-kind.constant';
import {IDialogButton} from '../../interfaces';

// tslint:disable-next-line:no-empty-interface
export class ErrorDialogSettings implements IDialogSettings {

  //#region Properties

  public readonly kind: string;

  public message: string | HtmlContent | TemplateRef<any>;

  public icon?: HtmlContent | TemplateRef<any>;

  public backdropClasses: string[];

  public buttons: IDialogButton[];

  public centered: boolean;

  public dialogClasses: string[];

  public disableClose: boolean;

  public injector?: Injector;

  public title: string | HtmlContent | TemplateRef<any>;

  //#endregion


  //#region Constructor

  public constructor(message: string | HtmlContent | TemplateRef<any>,
                     title?: string | HtmlContent | TemplateRef<any>,
                     icon?: HtmlContent | TemplateRef<any>,
                     injector?: Injector) {
    this.kind = DialogKindConstant.error;
    this.message = message;
    this.title = title || '';
    this.icon = icon;
    this.injector = injector;

    this.backdropClasses = [];
    this.buttons = [];
    this.centered = true;
    this.dialogClasses = [];
    this.disableClose = false;
  }

  //#endregion
}

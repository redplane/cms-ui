import {TemplateRef} from '@angular/core';
import {HtmlContent} from '../../html-content';

export interface IDialogSetting {

  //#region Properties

  // Dialog kind
  readonly kind: string;

  message: string | HtmlContent | TemplateRef<any>;

  title: string | HtmlContent | TemplateRef<any>;

  // TODO: Implement this option
  // timeout?: ModalTimeoutAction;

  disableClose?: boolean;

  dialogClasses?: string[];

  backdropClasses?: string[];

  // Whether dialog must be displayed at the center of the screen.
  centered?: boolean;

  //#endregion
}

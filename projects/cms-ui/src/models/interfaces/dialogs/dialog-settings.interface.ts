import {TemplateRef} from '@angular/core';
import {HtmlContent} from '../../html-content';
import {IDialogButton} from './dialog-button.interface';

export interface IDialogSettings {

  //#region Properties

  // Dialog kind
  readonly kind: string;

  message: string | HtmlContent | TemplateRef<any>;

  title?: string | HtmlContent | TemplateRef<any>;

  // TODO: Implement this option
  // timeout?: ModalTimeoutAction;

  disableClose?: boolean;

  dialogClasses?: string[];

  backdropClasses?: string[];

  // Whether dialog must be displayed at the center of the screen.
  centered?: boolean;

  // Dialog buttons which appears in the dialog.
  buttons?: IDialogButton[];

  //#endregion
}

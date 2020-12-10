import {TemplateRef} from '@angular/core';
import { HtmlContent } from '../../html-content';
import {IDialogButton} from './dialog-button.interface';

export interface IDialogSetting {

  //#region Properties

  message: string | HtmlContent | TemplateRef<any>;

  title: string | HtmlContent | TemplateRef<any>;

  buttons?: IDialogButton[];

  minWidth?: string;

  maxWidth?: string;

  minHeight?: string;

  maxHeight?: string;

  width?: string;

  height?: string;

  // TODO: Implement this option
  // timeout?: ModalTimeoutAction;

  disableClose?: boolean;

  dialogClass?: string[];

  backdropClass?: string;

  //#endregion
}

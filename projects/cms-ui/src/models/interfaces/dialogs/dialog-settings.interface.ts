import {TemplateRef} from '@angular/core';
import {IDialogButton} from './dialog-button.interface';
import {ModalTimeoutAction} from '../../../modules/dialogs/models/modal-timeout-action';
import {HtmlContent} from '@cms-ui/core';

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

  timeout?: ModalTimeoutAction;

  disableClose?: boolean;

  dialogClass?: string[];

  backdropClass?: string;

  //#endregion
}

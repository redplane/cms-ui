import {DialogResult} from '../../implementations/dialogs/dialog-result';
import {Observable} from 'rxjs';
import {TemplateRef} from '@angular/core';
import {HtmlContent} from '@cms-ui/core';

export interface IDialogButton {

  //#region Properties

  // Title of button.
  content: string | HtmlContent | TemplateRef<any>;

  // Handle which is fired when button is clicked.
  clickHandler?: () => DialogResult<any> | boolean | Observable<DialogResult<any>>;

  // Whether button is disabled or not.
  disabledHandler?: () => boolean;

  //#endregion
}

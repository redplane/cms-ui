import {Observable} from 'rxjs';
import {IDialogButton} from '../../interfaces';
import {DialogResult} from './dialog-result';
import {HtmlContent} from '../../html-content';
import {TemplateRef} from '@angular/core';

export class BasicDialogButton implements IDialogButton {

  //#region Properties

  public classes?: string[];

  // Whether button should be disabled or not.
  public disabledHandler?: () => boolean;

  //#endregion

  //#region Constructor

  public constructor(public content: string | HtmlContent | TemplateRef<any>,
                     public clickHandler?: () => boolean | DialogResult<any> | Observable<DialogResult<any>>,
                     classes?: string[]) {
    this.classes = classes;
  }

  //#endregion


}

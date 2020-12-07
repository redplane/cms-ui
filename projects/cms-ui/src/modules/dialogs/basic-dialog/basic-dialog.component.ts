import {Component, Inject, Input, OnDestroy, TemplateRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogResult} from '../../../models/implementations/dialogs/dialog-result';
import {ModalActionConstant} from '../modal-action.constant';
import {IDialogButton} from '../../../models/interfaces/dialogs/dialog-button.interface';
import {MODAL_BUTTON_TYPE} from '../modal-button-type.constant';
import {TemplateDialogButton} from '../../../models/implementations/dialogs/template-dialog-button';
import {BasicModalButton} from '../models/basic-modal-button';
import {HtmlContent} from '@med-advisor/core-ui';
import {Observable, Subscription} from 'rxjs';
import {first, tap} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirm-modal, basic-dialog',
  styleUrls: ['./basic-dialog.component.scss'],
  templateUrl: './basic-dialog.component.html'
})
export class BasicDialogComponent implements OnDestroy {

  //#region Properties

  // Id of modal component.
  private readonly _id: string;

  // Subscription watch list.
  private readonly _subscription: Subscription;

  // Modal icon
  @Input()
  public icon: string;

  // Modal title.
  @Input()
  public title: string | HtmlContent | TemplateRef<any>;

  // Modal content.
  @Input()
  public message: string | HtmlContent | TemplateRef<any>;

  // Modal action buttons.
  @Input()
  public buttons: IDialogButton[];

  // Modal dialog title template.
  // tslint:disable-next-line:no-input-rename
  @Input('icon-template')
  public iconTemplateRef: TemplateRef<any>;

  // Action template
  // tslint:disable-next-line:no-input-rename
  @Input('action-template')
  public actionTemplate: TemplateRef<any>;

  //#endregion

  //#region Accessors

  // Modal dialog id.
  public get id(): string {
    return this._id;
  }

  //#endregion

  //#region Constructor

  public constructor(
    public dialogRef: MatDialogRef<BasicDialogComponent>) {
    this._id = uuid();
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  // Called when modal button is clicked.
  public modalButtonClicked(clickedButton: IDialogButton): void {

    // Click handler is not found.
    if (!clickedButton.clickHandler) {
      throw new Error('Invalid button handler');
    }

    // Call the handler.
    const handlerResult = clickedButton.clickHandler();
    if (typeof (handlerResult) === 'boolean') {

      // Modal shouldn't be closed.
      if (!handlerResult) {
        return;
      }

      this.dialogRef.close(new DialogResult(ModalActionConstant.manuallyClosed, null));
      return;
    }

    // Handler is modal result.
    if (handlerResult instanceof DialogResult) {
      this.dialogRef.close(handlerResult as DialogResult<any>);
      return;
    }

    if (handlerResult instanceof Observable) {
      const observable = handlerResult as Observable<any>;
      observable
        .pipe(
          first(),
          tap(value => {
            if (!(value instanceof DialogResult)) {
              throw new Error('Value must be an instance of DialogResult');
            }
          })
        )
        .subscribe(value => {
          this.dialogRef.close(value);
        });
    }
  }

  // Get type of button.
  public getButtonType(button: IDialogButton): MODAL_BUTTON_TYPE {
    if (button instanceof TemplateDialogButton) {
      return 'template';
    }

    if (button instanceof BasicModalButton) {
      return 'basic';
    }

    throw new Error('Unknown modal button type');
  }

  // Get modal title type.
  public getTitleType(): 'string' | 'html' | 'template' {
    // Title is template reference.
    if (this.title instanceof TemplateRef) {
      return 'template';
    }

    if (this.title instanceof HtmlContent) {
      return 'html';
    }

    return 'string';
  }

  // Get modal message type.
  public getMessageType(): 'string' | 'html' | 'template' {
    // Title is template reference.
    if (this.message instanceof TemplateRef) {
      return 'template';
    }

    if (this.message instanceof HtmlContent) {
      return 'html';
    }

    return 'string';
  }

  // Get class which assigned to basic button.
  public getBasicButtonClass(button: IDialogButton): string {

    if (!(button instanceof BasicModalButton)) {
      return 'default';
    }

    const basicModalButton = button as BasicModalButton;
    if (!basicModalButton.classes) {
      return 'default';
    }

    return basicModalButton.classes.join(' ');
  }

  //#endregion

}

import {AfterViewInit, Component, Inject, Input, OnDestroy, Optional, ViewContainerRef} from '@angular/core';
import {IValidationSummarizerItemTemplateBuilder} from '../../../../services/interfaces/validation-summarizers/validation-summarizer-item-template-builder.interface';
import {VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER} from '../../../../constants';
import {ValidationMessage} from '../../../../models';
import {AbstractControl, NgControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-item',
  template: ''
})
export class ValidationSummarizerItemComponent implements AfterViewInit, OnDestroy {

  //#region Properties

  // Id of validation summarizer.
  // tslint:disable-next-line:variable-name
  private _containerId: string;

  // tslint:disable-next-line:variable-name
  private _validationMessage: ValidationMessage | undefined;

  // Form control which is being validated.
  // tslint:disable-next-line:variable-name
  private _control: AbstractControl | NgControl | undefined;

  // Control label.
  // tslint:disable-next-line:variable-name
  private _label: string | undefined;

  //#endregion

  //#region Accessors

  public get containerId(): string {
    return this._containerId;
  }

  @Input()
  public set containerId(value: string) {
    this._containerId = value;
  }

  public get validationMessage(): ValidationMessage | undefined {
    return this._validationMessage;
  }

  @Input()
  public set validationMessage(value: ValidationMessage | undefined) {
    this._validationMessage = value;
  }

  public get ngControl(): AbstractControl | NgControl | undefined {
    return this._control;
  }

  @Input()
  public set ngControl(value: AbstractControl | NgControl | undefined) {
    this._control = value;
  }

  public get controlLabel(): string | undefined {
    return this._label;
  }

  @Input()
  public set controlLabel(value: string | undefined) {
    this._label = value;
  }

  //#endregion

  //#region Constructor

  public constructor(
    // tslint:disable-next-line:max-line-length
    @Inject(VALIDATION_ITEM_TEMPLATE_BUILDERS_PROVIDER) @Optional() protected readonly validationItemTemplateBuilders: IValidationSummarizerItemTemplateBuilder[],
    protected readonly viewContainerRef: ViewContainerRef) {
    this._containerId = '';
  }

  //#endregion

  //#region Life cycle

  public ngAfterViewInit(): void {
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {
  }

  //#endregion

  //#region Methods


  //#endregion
}

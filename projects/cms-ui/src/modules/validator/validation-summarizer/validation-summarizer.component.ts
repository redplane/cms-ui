import {Component, InjectFlags, Injector, Input, TemplateRef} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER, VALIDATION_SUMMARIZER_PROVIDER} from '../../../constants/injectors';
import {IValidationSummarizerService} from '../../../services/interfaces/validation-summarizers/validation-summarizer-service.interface';
import {ValidationMessage} from '../../../models/implementations/validation-summarizers/validation-message';
import {IValidationSummarizerOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-options.interface';
import {v4 as uuid} from 'uuid';
import {IValidationSummarizerModuleOptions} from '../../../models/interfaces/validation-summarizers/validation-summarizer-module-options.interface';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cms-validation-summarizer',
  templateUrl: 'validation-summarizer.component.html',
  styleUrls: ['validation-summarizer.component.scss']
})
export class ValidationSummarizerComponent {

  //#region Properties

  // Component id.
  // tslint:disable-next-line:variable-name
  protected _groupId: string;

  // tslint:disable-next-line:variable-name
  protected _control: AbstractControl | NgControl | null;

  // tslint:disable-next-line:variable-name
  protected _maxValidationMessages = 0;

  // Validation summarizer options.
  // tslint:disable-next-line:variable-name
  protected _options: IValidationSummarizerModuleOptions;

  // Service for validating controls.
  protected validationSummarizerService: IValidationSummarizerService | null;

  // Handler for handling summarizer visibility.
  // tslint:disable-next-line:variable-name
  protected _visibilityHandler: ((ngControl: AbstractControl | NgControl) => boolean) | null;

  //#endregion

  //#region Accessors

  // Id of group the validation summarizer belongs to.
  // This can be used for identifying whether to apply validation summarizer item template builder or not.
  public get groupId(): string {
    return this._groupId;
  }

  // Set item group id.
  // tslint:disable-next-line:no-input-rename
  @Input('group-id')
  public set groupId(value: string) {

    if (!value || !value.length) {
      return;
    }

    this._groupId = value;
  }

  // Instance of the control that needs to be validated.
  @Input('instance')
  public set ngControl(control: AbstractControl | NgControl | null) {
    this._control = control;
  }

  // Get the instance of control that needs to be validated.
  public get ngControl(): AbstractControl | NgControl | null {
    return this._control;
  }

  // Label of control.
  // tslint:disable-next-line:no-input-rename
  @Input('label')
  public controlLabel: string;

  // Alternative template for validation summary.
  // tslint:disable-next-line:no-input-rename
  @Input('validation-template')
  public alternativeTemplate: TemplateRef<any> | null;

  // Get template context.
  public get templateContext(): any {
    return {
      ngControl: this.ngControl,
      controlLabel: this.controlLabel,
      validationMessages: this.loadValidationMessages(this.maximumValidationMessages)
    };
  }

  // Maximum number of validation messages.
  public get maximumValidationMessages(): number {
    return this._maxValidationMessages;
  }

  // Maximum number of validation messages.
  @Input('maximum-messages')
  public set maximumValidationMessages(value: number) {
    if (isNaN(value)) {
      this._maxValidationMessages = 0;
      return;
    }

    this._maxValidationMessages = value;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('visibility-handler')
  public set visibilityHandler(value: ((ngControl: AbstractControl | NgControl) => boolean) | null) {
    this._visibilityHandler = value;
  }

  public get visibilityHandler(): ((ngControl: AbstractControl | NgControl) => boolean) | null {
    return this._visibilityHandler;
  }

  // Validation summarizer options.
  public get options(): IValidationSummarizerOptions {
    return this._options;
  }

  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {

    // Service resolve.
    this.validationSummarizerService = injector.get(VALIDATION_SUMMARIZER_PROVIDER,
      null, InjectFlags.Optional);
    this._options = injector.get(VALIDATION_SUMMARIZER_MODULE_OPTIONS_PROVIDER, {});

    this._groupId = this._options.groupId || uuid();
    this._maxValidationMessages = this._options.maximumMessages || 0;
    this._visibilityHandler = this._options.visibilityHandler || null;

    this.controlLabel = '';
    this._control = null;
    this.alternativeTemplate = null;
    this._visibilityHandler = null;
  }

  //#endregion

  //#region Methods

  public ableToDisplayValidationMessages(ngControl: AbstractControl | NgControl | null): boolean {

    if (!ngControl) {
      return false;
    }

    // Visibility handler is defined.
    if (this.visibilityHandler) {
      return this.visibilityHandler(ngControl);
    }

    if (!ngControl) {
      return false;
    }

    const ableToDisplay = ngControl.invalid && (ngControl.dirty || ngControl.touched) === true;
    return true === ableToDisplay;
  }

  //#endregion

  //#region Internal methods

  protected loadValidationMessages(maximumValidationMessages: number | null): ValidationMessage[] {

    if (!this.validationSummarizerService || !this.ngControl) {
      return [];
    }

    let messages = this.validationSummarizerService
      .loadControlValidationMessages(this.controlLabel, this.ngControl);

    if (!messages) {
      return [];
    }

    if (!maximumValidationMessages || isNaN(maximumValidationMessages)) {
      return messages;
    }

    if (maximumValidationMessages < 1) {
      return messages;
    }

    messages = messages.slice(0, maximumValidationMessages);
    return messages;
  }

  //#endregion
}

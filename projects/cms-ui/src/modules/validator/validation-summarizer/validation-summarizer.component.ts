/*
* This component is about receiving instance of another
* form control-modules which implement
* ControlValueAccessor interface to do validation.
* */
import {Component, Inject, Input, Optional, TemplateRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {IValidationMessageService} from '../../../services/interfaces/validation-summarizer-service.interface';
import {VALIDATION_MESSAGE_PROVIDER} from '../../constants';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'validation-message',
    templateUrl: 'validation-summarizer.component.html',
    styleUrls: ['validation-summarizer.component.scss']
})
export class ValidationSummarizerComponent {

    //#region Properties

    // Control to be validated.
    // tslint:disable-next-line:variable-name
    private _control: NgControl;

    // Maximum number of validation messages.
    // tslint:disable-next-line:variable-name
    private _maxValidationMessages = 0;

    //#endregion

    //#region Accessors

    // Instance of the control that needs to be validated.
    @Input('control-instance')
    public set ngControl(control: NgControl) {
        this._control = control;
    }

    // Get the instance of control that needs to be validated.
    public get ngControl(): NgControl {
        return this._control;
    }

    // Label of control.
    // tslint:disable-next-line:no-input-rename
    @Input('control-label')
    public controlLabel: string;

    // Alternative template for validation summary.
    // tslint:disable-next-line:no-input-rename
    @Input('validation-template')
    public readonly alternativeTemplate: TemplateRef<any>;

    // Get template context.
    public get templateContext(): any {
        return {
            ngControl: this.ngControl,
            controlLabel: this.controlLabel,
            validationMessages: this.getValidationMessages(this.maximumValidationMessages)
        };
    }

    // Maximum number of validation messages.
    public get maximumValidationMessages(): number {
        return this._maxValidationMessages;
    }

    /*
    * Maximum number of validation messages.
    * */
    @Input('maximum-validation-messages')
    public set maximumValidationMessage(value: number) {
        if (isNaN(value)) {
            this._maxValidationMessages = null;
            return;
        }

        this._maxValidationMessages = value;
    }

    //#endregion

    //#region Constructor

    public constructor(@Optional() @Inject(VALIDATION_MESSAGE_PROVIDER) protected validationMessageService: IValidationMessageService) {
        this._maxValidationMessages = 0;
    }

    //#endregion

    //#region Methods

    // Get validation messages.
    protected getValidationMessages(maximumValidationMessages: number | null): string[] {

        let messages = this.validationMessageService
            .loadControlValidationMessages(this.controlLabel, this.ngControl);

        if (!messages) {
            return null;
        }

        if (isNaN(maximumValidationMessages)) {
            return messages;
        }

        if (maximumValidationMessages == null || maximumValidationMessages < 1) {
            return messages;
        }

        messages = messages.slice(0, maximumValidationMessages);
        return messages;
    }

    // Whether validation message-modal should be displayed or not.
    public shouldValidationMessageDisplayed(control: NgControl): boolean {
        return this.validationMessageService.shouldValidationMessageDisplayed(control);
    }

    //#endregion
}

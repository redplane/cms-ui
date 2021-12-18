import {Directive, Input, TemplateRef} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';
import {MultipleValidationSummarizerItemContext} from '../../../../models/interfaces/multiple-validation-summarizers/multiple-validation-summarizer-item-context';
import {v4 as uuid} from 'uuid';
import {Observable, Subject} from 'rxjs';
import {MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT} from '@cms-ui/core/src/constants/multiple-validation-summarizer-constants';

@Directive({
  selector: 'cms-multiple-validation-summarizer item-context'
})
export class MultipleValidationSummarizerItemContextDirective {

  //#region Properties

  // Id of directive.
  private readonly _id: string;

  // Instance to be validated.
  private _instance: AbstractControl | NgControl | null = null;

  // Label of validated instance.
  private _label = '';

  // Item template
  private _template: TemplateRef<MultipleValidationSummarizerItemContext> | null = null;

  // Whether control has been initialized or not.
  private _hasControlInitialized = false;

  // Raise event about context changed.
  private _updatedEventSubject: Subject<MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT>
    = new Subject<MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT>();

  // Event which is emitted when property is changed.
  public readonly updateEvent: Observable<MULTIPLE_VALIDATION_SUMMARIZER_CONTEXT_CHANGED_EVENT>
    = this._updatedEventSubject.asObservable();

  //#endregion

  //#region Accessors

  public get id(): string {
    return this._id;
  }

  public get instance(): AbstractControl | NgControl | null {
    return this._instance;
  }

  @Input()
  public set instance(value: AbstractControl | NgControl | null) {
    this._instance = value;
    this.sendUpdateEvent('instance', value);
  }

  public get label(): string {
    return this._label;
  }

  @Input()
  public set label(value: string) {
    this._label = value;
    this.sendUpdateEvent('label', value);
  }

  public get template(): TemplateRef<MultipleValidationSummarizerItemContext> | null {
    return this._template;
  }

  @Input()
  public set template(value: TemplateRef<MultipleValidationSummarizerItemContext> | null) {
    this._template = value;
    this.sendUpdateEvent('template', value);
  }

  //#endregion

  //#region Constructor

  public constructor() {
    this._id = uuid();
  }

  //#endregion

  //#region Methods

  private sendUpdateEvent(name: MULTIPLE_VALIDATION_SUMMARIZER_PROPERTY, value: any): void {
    if (!this._hasControlInitialized) {
      return;
    }

    this._updatedEventSubject.next({name, value});
  }

  //#endregion

}

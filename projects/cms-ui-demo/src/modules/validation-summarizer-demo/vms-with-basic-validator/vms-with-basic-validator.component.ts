import {Component, ElementRef, Inject, Injector, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationSummarizerSectionsConstant} from '../../../constants/validation-summarizer-sections.constant';
import {CodeExampleFilePathConstant} from '../../../constants/screen-codes/code-example-file-path.constant';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {ScrollToItemChannelEvent} from '../../../models/channel-events/scroll-to-item.channel-event';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vsm-with-visibility-handler-demo',
  templateUrl: 'vms-with-basic-validator.component.html'
})
export class VmsWithBasicValidatorComponent implements OnInit, OnDestroy {

  //#region Properties
  // Form group and form control declaration
  public readonly studentForm: FormGroup;

  public readonly studentNameControl: FormControl;

  public readonly studentAgeControl: FormControl;

  public readonly securityNoControl: FormControl;

  public readonly subscription: Subscription;

  // File path to load code example from assets
  public codeExampleFilePathConstant = CodeExampleFilePathConstant;

  //#endregion

  //#region Constructor

  public constructor(
    @Inject(MESSAGE_BUS_SERVICE_PROVIDER) protected messageBusService: INgRxMessageBusService,
    @Inject(DOCUMENT) protected document: Document
  ) {
    this.studentNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.studentAgeControl = new FormControl('', [Validators.min(10)]);
    this.securityNoControl = new FormControl('');

    this.studentForm = new FormGroup({
      name: this.studentNameControl,
      age: this.studentAgeControl,
      securityNo: this.securityNoControl
    });

    this.subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
    const hookScrollEventSubscription = this.messageBusService.hookTypedMessageChannel<string>(new ScrollToItemChannelEvent())
      .pipe(
        tap(item => this.document.querySelector(`.${item}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        }))
      )
      .subscribe();
    this.subscription.add(hookScrollEventSubscription);
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  //#endregion
}

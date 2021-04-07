import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {Subscription} from 'rxjs';
import {ValidationSummarizerSectionsConstant} from '../../../constants/validation-summarizer-sections.constant';
import {CodeExampleFilePathConstant} from '../../../constants/screen-codes/code-example-file-path.constant';

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

  // Tracks the item corresponding to the section
  public currentItem: string;

  // Define section on page
  public validationSummarizerSectionsConstant = ValidationSummarizerSectionsConstant;

  // File path to load code example from assets
  public codeExampleFilePathConstant = CodeExampleFilePathConstant;

  public importModuleContentCodeExample = '@NgModule({\n' +
    '  imports: [\n' +
    '    ...\n' +
    '    ValidationSummarizerModule,\n' +
    '    ...\n' +
    '  ],\n' +
    '  declarations: [\n' +
    '    ...\n' +
    '  ],\n' +
    '  exports: [\n' +
    '    ...\n' +
    '  ],\n' +
    '  providers: [\n' +
    '    {\n' +
    '      provide: VALIDATION_SUMMARIZER_PROVIDER,\n' +
    '      useClass: TranslatedValidationSummarizerService\n' +
    '    },\n' +
    '    {\n' +
    '      provide: VALIDATION_SUMMARIZER_BUILT_IN_MESSAGE_FALLBACK,\n' +
    '      useValue: true\n' +
    '    },\n' +
    '    {\n' +
    '      provide: VALIDATION_SUMMARIZER_MESSAGES,\n' +
    '      useValue: {\n' +
    '        notSmallerThan: \'MSG_CUSTOM_VALIDATOR_MESSAGE_NOT_SMALLER_THAN\'\n' +
    '      }\n' +
    '    }\n' +
    '  ]\n' +
    '})';

  public selectorUsageCodeExample = '<cms-validation-summarizer\n' +
    '       [instance]="exampleControl"\n' +
    '       label="EXAMPLE_LABEL">\n' +
    ' </cms-validation-summarizer>';

  public customValidatorCodeExample = 'export const customValidationMessages: {[name: string]: string; } = {\n' +
    '  custom: \'MSG_VALIDATION_CUSTOM\',\n' +
    '};';

  public activeClasses = 'list-group-item list-group-item-action list-group-item-primary';

  public inActiveClasses = 'list-group-item list-group-item-action list-group-item-light';

  @ViewChild('description', {static: false})
  // @ts-ignore
  public description: ElementRef;

  @ViewChild('api', {static: false})
  // @ts-ignore
  public api: ElementRef;

  @ViewChild('examples', {static: false})
  // @ts-ignore
  public examples: ElementRef;

  //#endregion

  //#region Constructor

  public constructor() {
    this.studentNameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.studentAgeControl = new FormControl('', [Validators.min(10)]);
    this.securityNoControl = new FormControl('');

    this.studentForm = new FormGroup({
      name: this.studentNameControl,
      age: this.studentAgeControl,
      securityNo: this.securityNoControl
    });

    this.currentItem = 'description';
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  //#endregion
  public scrollToItem(item: string): void {
    this.currentItem = item;
    switch (item) {
       case 'description':
         this.description.nativeElement.scrollIntoView({
           behavior: 'smooth',
           block: 'start',
           inline: 'nearest'
         });
         break;
       case 'examples':
         this.examples.nativeElement.scrollIntoView({
           behavior: 'smooth',
           block: 'start',
           inline: 'nearest'
         });
         break;
       case 'api':
         this.api.nativeElement.scrollIntoView({
           behavior: 'smooth',
           block: 'start',
           inline: 'nearest'
         });
         break;
       default:
         return;
     }
  }
}

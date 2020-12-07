import {ValidationSummarizerComponent} from './validation-summarizer.component';
import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IValidationMessageService} from '../../../services/interfaces/validation-summarizer-service.interface';
import {VALIDATION_MESSAGE_DICTIONARY_PROVIDER, VALIDATION_MESSAGE_PROVIDER} from '../../constants';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ValidationSummarizerComponent
    ],
    exports: [
        ValidationSummarizerComponent
    ]
})
export class ValidationSummarizerModule {

    public static forRoot(implementation: Type<IValidationMessageService>,
                          dictionary?: { [key: string]: string }): ModuleWithProviders<ValidationSummarizerModule> {
        return {
            ngModule: ValidationSummarizerModule,
            providers: [
                {
                    provide: VALIDATION_MESSAGE_PROVIDER,
                    useClass: implementation
                },
                {
                    provide: VALIDATION_MESSAGE_DICTIONARY_PROVIDER,
                    useValue: dictionary
                }
            ]
        };
    }
}

//#endregion

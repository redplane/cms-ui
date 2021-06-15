import {Observable} from 'rxjs';
import {ValidationSummarizerItemComponent} from '../../../modules/validator/validation-summarizer/validation-summarizer-item/validation-summarizer-item.component';

export interface IValidationSummarizerItemTemplateBuilder {

  //#region Methods

  // Check whether template is able to built asynchronously or not.
  ableToBuildTemplateAsync(): Observable<boolean>;

  // Build the item asynchronously.
  buildTemplateAsync(): Observable<ValidationSummarizerItemComponent>;

  //#endregion

}

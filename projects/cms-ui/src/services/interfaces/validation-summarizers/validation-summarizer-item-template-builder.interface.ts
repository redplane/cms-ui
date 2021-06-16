import {Observable} from 'rxjs';
import {ComponentRef} from '@angular/core';
import {ValidationItemBuildContext} from '../../../models/implementations/validation-summarizers/validation-item-build-context';

export interface IValidationSummarizerItemTemplateBuilder {

  //#region Methods

  // Check whether template is able to built asynchronously or not.
  ableToBuildTemplateAsync(context: ValidationItemBuildContext): Observable<boolean>;

  // Build the item asynchronously.
  buildTemplateAsync(context: ValidationItemBuildContext): Observable<ComponentRef<any>>;

  //#endregion

}

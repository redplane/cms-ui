import {Observable} from 'rxjs';

export interface IRequireRolePermissionService {

  //#region Methods

  // Trigger validation on directives.
  doValidation(): void;

  // Register control with validation event.
  hookValidationEventAsync(): Observable<void>;

  // Whether user has any role in the provided one or not.
  hasAnyRoleAsync(names: string[]): Observable<boolean>;

  //#endregion
}

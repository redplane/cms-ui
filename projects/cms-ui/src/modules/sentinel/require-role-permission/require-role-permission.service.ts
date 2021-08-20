import {IRequireRolePermissionService} from './require-role-permission-service.interface';
import {Observable, Subject} from 'rxjs';

export abstract class RequireRolePermissionService implements IRequireRolePermissionService {

//#region Properties

  // Validation event emitter.
  // tslint:disable-next-line:variable-name
  private readonly _validationEvent: Subject<void>;

  //#endregion

  //#region Constructor

  protected constructor() {
    this._validationEvent = new Subject<void>();
  }

  //#endregion

  //#region Methods

  // Trigger manual validation.
  public doValidation(): void {
    this._validationEvent.next(void (0));
  }

  // Hook to validation event.
  public hookValidationEventAsync(): Observable<void> {
    return this._validationEvent.asObservable();
  }

  // Whether user has any role or not.
  public abstract hasAnyRoleAsync(names: string[]): Observable<boolean>;

  //#endregion

}

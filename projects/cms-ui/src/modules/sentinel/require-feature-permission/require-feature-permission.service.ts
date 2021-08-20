import {Observable, Subject} from 'rxjs';
import {IRequireFeaturePermissionService} from './require-feature-permission-service.interface';

export abstract class RequireFeaturePermissionService implements IRequireFeaturePermissionService {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _doValidationEvent: Subject<void>;

  //#endregion

  //#region Constructor

  protected constructor() {
    this._doValidationEvent = new Subject();
  }

  //#endregion

  //#region Methods

  public doValidation(): void {
    this._doValidationEvent.next();
  }

  public hookValidationEventAsync(): Observable<void> {
    return this._doValidationEvent.asObservable();
  }

  public abstract ableToAccessFeaturesAsync(names: string[]): Observable<boolean>;

  //#endregion

}

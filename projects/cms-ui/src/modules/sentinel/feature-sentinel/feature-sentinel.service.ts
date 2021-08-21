import {Observable, Subject} from 'rxjs';
import {IFeatureSentinelService} from './feature-sentinel-service.interface';

export abstract class FeatureSentinelService implements IFeatureSentinelService {

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

import {Observable} from 'rxjs';

export interface IFeatureSentinelService {

    //#region Methods

    // Trigger validation on directives.
    doValidation(): void;

    // Register control with validation event.
    hookValidationEventAsync(): Observable<void>;

    // Whether feature can be accessed or not.
    ableToAccessFeaturesAsync(names: string[]): Observable<boolean>;

    //#endregion
}

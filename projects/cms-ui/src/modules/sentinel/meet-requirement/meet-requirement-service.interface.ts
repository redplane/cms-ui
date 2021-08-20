import {Observable} from 'rxjs';

export interface IMeetRequirementService {

    //#region Methods

    // Whether requirement should be met or not.
    shouldRequirementMetAsync(name: string): Observable<boolean>;

    //#endregion
}

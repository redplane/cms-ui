import {Observable} from 'rxjs';

export interface IRequirementHandler {

    //#region Properties

    // Name of requirement handler.
    readonly name: string;

    //#endregion

    //#region Methods

    // Whether requirement should be met or not.
    shouldRequirementMetAsync(): Observable<boolean>;

    //#endregion

}

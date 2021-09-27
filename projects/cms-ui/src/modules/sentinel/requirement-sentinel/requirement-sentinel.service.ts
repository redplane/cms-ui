import {IMeetRequirementService} from './requirement-sentinel-service.interface';
import {Observable, of} from 'rxjs';
import {Injector} from '@angular/core';
import {IRequirementHandler} from './requirement-handler.interface';
import {REQUIREMENT_HANDLER_PROVIDER} from '../../../constants';

export class RequirementSentinelService implements IMeetRequirementService {

    //#region Properties

  // tslint:disable-next-line:variable-name
    private readonly _requirementHandlers: IRequirementHandler[];

    //#endregion

    //#region Constructor

    public constructor(injector: Injector) {
        this._requirementHandlers = injector
            .get(REQUIREMENT_HANDLER_PROVIDER) as unknown as IRequirementHandler[];
    }

    //#endregion

    //#region Methods

    public shouldRequirementMetAsync(name: string): Observable<boolean> {

        // No requirement is found.
        if (!this._requirementHandlers || !this._requirementHandlers.length) {
            return of(false);
        }
        // Find the requirement which has the exact name  with the passed one.
        const requirementHandler = this._requirementHandlers.find(item => item.name === name);
        if (!requirementHandler) {
            return of(false);
        }

        return requirementHandler.shouldRequirementMetAsync();
    }

    //#endregion
}

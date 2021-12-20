import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {
  DetailedUiModuleSectionSelectedChannelEvent
} from '../models/channel-events/ui-modules/detailed-ui-module-section-selected.channel-event';

@Injectable()
export class UiModuleSectionPageGuard implements CanActivate {

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE_PROVIDER)
                     protected readonly _messageBusService: INgRxMessageBusService) {
  }

  //#endregion

  //#region Methods

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {id} = route.params;
    this._messageBusService.addTypedMessage(new DetailedUiModuleSectionSelectedChannelEvent(), id);
    return of(true);
  }

  //#endregion
}

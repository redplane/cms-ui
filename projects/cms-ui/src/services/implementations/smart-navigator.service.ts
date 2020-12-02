import {ISmartNavigatorService} from '../interfaces/smart-navigator-service.interface';
import {Inject, Injectable, Optional} from '@angular/core';
import {from, Observable, Subscription} from 'rxjs';
import {NavigationExtras, Router, NavigationEnd, UrlTree} from '@angular/router';
import {templateSettings, template} from 'lodash';
import {filter} from 'rxjs/operators';
import {SMART_NAVIGATOR_ROUTES} from '../../constants/injection-token.constant';
import {merge as lodashMerge} from 'lodash-es';

@Injectable()
export class SmartNavigatorService implements ISmartNavigatorService {

  //#region Properties

  // Navigation history
  private navigationHistory = [];

  // tslint:disable-next-line:whitespace variable-name
  private readonly _codeToUrlMappings: { [key: string]: string; };

  //#endregion

  //#region Constructor

  public constructor(protected router: Router,
                     @Optional() @Inject(SMART_NAVIGATOR_ROUTES) protected codeToUrlMappings: { [key: string]: string }) {
    this._codeToUrlMappings = {};

    if (codeToUrlMappings) {
      this._codeToUrlMappings = lodashMerge({}, codeToUrlMappings);
    }
  }

  //#endregion

  //#endregion

  //#region Methods

  // Navigate to a screen by using screen code.
  // tslint:disable-next-line: whitespace
  public navigateToScreenAsync(code: string, routeParams?: { [key: string]: any; }, extras?: NavigationExtras): Observable<boolean> {
    if (!this._codeToUrlMappings) {
      throw new Error('No mapping is found');
    }
    if (!this._codeToUrlMappings[code]) {
      throw new Error(`No url is found with screen code: ${code}`);
    }
    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(this._codeToUrlMappings[code]);
    const fullUrl = compiled(routeParams);

    return from(this.router.navigate([fullUrl], extras));
  }

  // Get raw url.
  public loadRawUrl(code: string): string | null {
    if (!code || !code.length) {
      return null;
    }

    return this._codeToUrlMappings[code];
  }

  // Build url tree.
  public buildUrlTree(screenCode: string, routeParams?: { [key: string]: any; },
                      extras?: NavigationExtras): UrlTree {
    const rawUrl = this.loadRawUrl(screenCode) || '';
    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(rawUrl);
    const fullUrl = compiled(routeParams);

    return this.router.createUrlTree([fullUrl], extras);
  }

  //#endregion
}

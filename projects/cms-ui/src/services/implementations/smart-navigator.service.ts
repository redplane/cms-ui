import {ISmartNavigatorService} from '../interfaces/smart-navigator-service.interface';
import {Injector} from '@angular/core';
import {from, Observable} from 'rxjs';
import {NavigationExtras, Router, NavigationEnd, UrlTree} from '@angular/router';
import {templateSettings, template} from 'lodash-es';
import {SMART_NAVIGATOR_ROUTES} from '../../constants/injection-token.constant';
import {merge as lodashMerge} from 'lodash-es';
import {NavigateToScreenRequest} from '../../models/implementations/smart-navigators/navigate-to-screen-request';

export class SmartNavigatorService implements ISmartNavigatorService {

  //#region Properties

  // tslint:disable-next-line:whitespace variable-name
  private readonly _codeToUrlMappings: { [key: string]: string; };

  protected router: Router;


  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {

    const codeToUrlMappings = this.injector.get(SMART_NAVIGATOR_ROUTES);
    this.router = this.injector.get(Router);
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
  public navigateToScreenAsync(request: NavigateToScreenRequest<any>): Observable<boolean> {

    if (!request) {
      throw new Error('Invalid request');
    }

    if (!this._codeToUrlMappings) {
      throw new Error('No mapping is found');
    }

    if (!this._codeToUrlMappings[request.code]) {
      throw new Error(`No url is found with screen code: ${request.code}`);
    }

    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(this._codeToUrlMappings[request.code]);
    const fullUrl = compiled(request.routeParams);

    return from(this.router.navigate([fullUrl], request.extras));
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

    const urlTree = this.router.createUrlTree([fullUrl], extras);
    return urlTree;
  }

  //#endregion
}

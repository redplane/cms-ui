import {ISmartNavigatorService} from '../interfaces/smart-navigator-service.interface';
import {InjectFlags, Injector} from '@angular/core';
import {from, Observable} from 'rxjs';
import {NavigationExtras, Router, UrlTree} from '@angular/router';
import {merge as lodashMerge, template, templateSettings} from 'lodash-es';
import {SMART_NAVIGATOR_ROUTES, SMART_NAVIGATOR_SCREEN_CODE_RESOLVER} from '../../constants/injectors';
import {NavigateToScreenRequest} from '../../models/implementations/smart-navigators/navigate-to-screen-request';
import {IScreenCodeResolver} from '../interfaces/screen-code-resolver.interface';
import {SmartNavigatorExceptions} from '../../constants/smart-navigator-exceptions';

export class SmartNavigatorService implements ISmartNavigatorService {

  //#region Properties

  // tslint:disable-next-line:whitespace variable-name
  private readonly _codeToUrlMappings: { [key: string]: string; };

  protected router: Router;

  protected screenCodeResolvers: IScreenCodeResolver[];


  //#endregion

  //#region Constructor

  public constructor(protected injector: Injector) {

    const codeToUrlMappings = this.injector.get(SMART_NAVIGATOR_ROUTES);
    this.router = this.injector.get(Router);
    this.screenCodeResolvers = this.injector.get(SMART_NAVIGATOR_SCREEN_CODE_RESOLVER,
      null, InjectFlags.Optional) as any as IScreenCodeResolver[];
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
      throw new Error(SmartNavigatorExceptions.invalidNavigationRequest);
    }

    // Get raw url from screen code.
    const rawUrl = this.loadRawUrl(request.code);

    templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = template(rawUrl);
    const fullUrl = compiled(request.routeParams);

    return from(this.router.navigate([fullUrl], request.extras));
  }

  // Get raw url.
  public loadRawUrl(code: string): string {
    if (!code || !code.length) {
      throw new Error(SmartNavigatorExceptions.invalidScreenCode);
    }

    let url: string | null = this._codeToUrlMappings[code];
    if (url) {
      return url;
    }

    const screenCodeResolvers = this.screenCodeResolvers;
    if (!screenCodeResolvers || !screenCodeResolvers.length) {
      throw new Error(SmartNavigatorExceptions.invalidScreenCode);
    }

    for (const screenCodeResolver of screenCodeResolvers) {
      url = screenCodeResolver.loadUrl(code);
      if (url && url.length) {
        return url;
      }
    }

    throw new Error(SmartNavigatorExceptions.invalidScreenCode);
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

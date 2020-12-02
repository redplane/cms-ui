import {Observable, Subscription} from 'rxjs';
import {NavigationExtras, UrlTree} from '@angular/router';

export interface ISmartNavigatorService {

  //#region Methods

  // Navigate to a specific screen by using screen code.
  navigateToScreenAsync(code: string, routeParams?: { [key: string]: any }, extras?: NavigationExtras): Observable<boolean>;

  // Get raw url from code.
  loadRawUrl(code: string): string | null;

  // Build url tree from screen code.
  buildUrlTree(screenCode: string, routeParams?: { [key: string]: any; },
               extras?: NavigationExtras): UrlTree;

  //#endregion
}

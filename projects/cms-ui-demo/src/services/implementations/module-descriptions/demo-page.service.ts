import {IDemoPageService} from '../../../modules/pages/ui-module-page/ui-module-section-page/ui-module-section-page.interface';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DEMO_PAGE_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {map} from 'rxjs/operators';

@Injectable()
export class DemoPageService implements IDemoPageService {

  //#region Properties

  //#endregion

  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient,
                     @Inject(DEMO_PAGE_TEMPLATE_PATH_PROVIDER) protected readonly demoPageTemplatePath: string) {
  }

  //#endregion

  //#region Methods

  public loadDemoContentAsync(): Observable<string> {
    const httpHeaders = new HttpHeaders({
      Accept: 'text/html'
    });
    return this.httpClient.get(this.demoPageTemplatePath, {
      headers: httpHeaders,
      responseType: 'text'
    }).pipe(
      map(content => content as string)
    );
  }

  //#endregion
}

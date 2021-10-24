import {IModuleDescriptionService} from '../../../modules/shared/demo-layout/module-description/module-description-service.interface';
import {ChangeDetectorRef, Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER} from '../../../constants/injectors';
import {map} from 'rxjs/operators';

@Injectable()
export class ModuleDescriptionService implements IModuleDescriptionService {

  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient,
                     @Inject(MODULE_DESCRIPTION_TEMPLATE_PATH_PROVIDER) protected readonly templatePath: string) {

  }

  //#endregion

  //#region Methods

  public loadModuleDescriptionAsync(): Observable<string> {

    const httpHeaders = new HttpHeaders({
      Accept: 'text/html'
    });
    return this.httpClient.get(this.templatePath, {
      headers: httpHeaders,
      responseType: 'text'
    }).pipe(
      map(content => content as string)
    );
  }

  //#endregion

}

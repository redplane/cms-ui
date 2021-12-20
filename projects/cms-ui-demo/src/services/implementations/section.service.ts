import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_RESOLVER} from '../../constants/injectors';
import {IEndpointResolver} from '../interfaces/endpoint-resolver.interface';
import {mergeMap} from 'rxjs/operators';
import {SectionViewModel} from '../../view-models/section.view-model';
import {ISectionService} from '../interfaces/section-service.interface';

@Injectable()
export class SectionService implements ISectionService {

  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient,
                     @Inject(ENDPOINT_RESOLVER) protected readonly _endpointResolver: IEndpointResolver) {
  }

  //#endregion

  //#region Methods

  public loadSectionByIdAsync(id: string): Observable<SectionViewModel> {
    return this._endpointResolver.loadEndpointAsync('', '')
      .pipe(
        mergeMap(baseUrl => {
          const endPoint = `${baseUrl}/api/section/${id}`;
          return this.httpClient.get<SectionViewModel>(endPoint);
        })
      )
  }


  //#endregion
}

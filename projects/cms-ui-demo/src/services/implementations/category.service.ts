import {ICategoryService} from '../interfaces/category-service.interface';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {HttpClient} from '@angular/common/http';
import {ENDPOINT_RESOLVER} from '../../constants/injectors';
import {IEndpointResolver} from '../interfaces/endpoint-resolver.interface';
import {mergeMap} from 'rxjs/operators';
import {CategoryViewModel} from '../../view-models/category.view-model';

@Injectable()
export class CategoryService implements ICategoryService {

  //#region Constructor

  public constructor(
    @Inject(ENDPOINT_RESOLVER) protected readonly _endpointResolver: IEndpointResolver,
    protected readonly httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadCategoryByIdAsync(id: string): Observable<CategoryViewModel> {
    return this._endpointResolver.loadEndpointAsync('', '')
      .pipe(
        mergeMap((baseUrl: string) => {
          const endpoint = `${baseUrl}/api/category/${id}`;
          return this.httpClient.get<CategoryViewModel>(endpoint);
        })
      );
  }

  public loadCategoriesAsync(): Observable<Category[]> {
    return this._endpointResolver.loadEndpointAsync('', '')
      .pipe(
        mergeMap((baseUrl: string) => {
          const endpoint = `${baseUrl}/api/category/search`;
          return this.httpClient.post<Category[]>(endpoint, {});
        })
      );
  }

  //#endregion

}

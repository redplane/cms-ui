import {ICategoryService} from '../interfaces/category-service.interface';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService implements ICategoryService {

  //#region Properties

  private readonly _baseUrl = 'http://localhost:3000';

  //#endregion

  //#region Constructor

  public constructor(protected readonly httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadCategoriesAsync(): Observable<Category[]> {
    const endpoint = `${this._baseUrl}/api/category/search`;
    return this.httpClient.post<Category[]>(endpoint, {});
  }

  //#endregion

}

import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {CategoryViewModel} from '../../view-models/category.view-model';

export interface ICategoryService {

  // Load category by id asynchronously.
  loadCategoryByIdAsync(id: string): Observable<CategoryViewModel>;

  loadCategoriesAsync(): Observable<Category[]>;

}

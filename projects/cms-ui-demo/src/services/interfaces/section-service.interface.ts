import {Observable} from 'rxjs';
import {SectionViewModel} from '../../view-models/section.view-model';

export interface ISectionService {

  //#region Methods

  // Load demo modules asynchronously.
  loadSectionByIdAsync(id: string): Observable<SectionViewModel>;

  //#endregion

}

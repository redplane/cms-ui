import {Injector, Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Pipe({
  name: 'ToStaticFileContentAsync'
})

export class ToStaticFileContentPipe implements PipeTransform {

  //#region properties
  // tslint:disable-next-line:variable-name
  private readonly _httpClient: HttpClient;
  //#endregion

  //#region constructor
  public constructor(private injector: Injector) {
    this._httpClient = this.injector.get(HttpClient);
  }

  //#endregion

  //#region methods
  public transform(value: any, ...args: any[]): Observable<string> {
    return this._httpClient.get(value, {
      responseType: 'text'
    }).pipe(
      map(x => x as unknown as string)
    );
  }

  //#endregion
}

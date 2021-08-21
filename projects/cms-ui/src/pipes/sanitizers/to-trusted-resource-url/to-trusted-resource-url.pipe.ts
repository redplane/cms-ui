import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Pipe({
  name: 'toTrustedResourceUrl'
})
export class ToTrustedResourceUrlPipe implements PipeTransform {

  //#region Constructor

  public constructor(protected readonly sanitizer: DomSanitizer) {
  }

  //#endregion

  //#region Methods

  public transform(value: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  //#endregion

}

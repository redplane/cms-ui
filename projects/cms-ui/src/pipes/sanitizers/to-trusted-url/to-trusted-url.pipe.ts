import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'toTrustedUrl'
})
export class ToTrustedUrlPipe implements PipeTransform {

  //#region Constructor

  public constructor(protected readonly sanitizer: DomSanitizer) {
  }

  //#endregion

  //#region Methods

  public transform(value: string, ...args: any[]): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

  //#endregion
}

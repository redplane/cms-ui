import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Pipe({
  name: 'toTrustedPipe'
})
export class ToTrustedStylePipe implements PipeTransform {

  //#region Constructor

  public constructor(protected readonly sanitizer: DomSanitizer) {
  }

  //#endregion

  //#region Methods

  public transform(value: string, ...args: any[]): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

  //#endregion
}

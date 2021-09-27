import {Pipe, PipeTransform, Sanitizer} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'toTrustedHtml'
})
export class ToTrustedHtmlPipe implements PipeTransform {

  //#region Constructor

  public constructor(protected readonly sanitizer: DomSanitizer) {
  }

//#endregion

  //#region Methods

  public transform(value: string, ...args: any[]): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  //#endregion
}

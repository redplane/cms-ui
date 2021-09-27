import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeScript} from '@angular/platform-browser';

@Pipe({
  name: 'toTrustedScript'
})
export class ToTrustedScriptPipe implements PipeTransform {

  //#region Constructor

  public constructor(protected readonly sanitizer: DomSanitizer) {
  }

  //#endregion

  //#region Methods

  public transform(value: string, ...args: any[]): SafeScript {
    return this.sanitizer.bypassSecurityTrustScript(value);
  }

  //#endregion
}

import {Component, HostBinding} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss']
})
export class LandingPageComponent {

  //#region Accessor

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  //#endregion
}

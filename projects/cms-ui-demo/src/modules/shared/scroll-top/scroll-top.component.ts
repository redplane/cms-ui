import {Component, HostListener, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../constants/injection-token.constant';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  //#region Properties
  public windowScrolled: boolean | unknown;

  private smoothScrollHandler = (): void => {
    const currentScroll = this.document.documentElement.scrollTop || this.document.body.scrollTop;

    if (currentScroll > 0) {
      this.windowService.requestAnimationFrame(this.smoothScrollHandler);
      this.windowService.scrollTo(0, currentScroll - (currentScroll / 8));
    }
  }
  //#endregion

  //#region Constructor
  constructor(@Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) protected windowService: Window) {
  }

  //#endregion

  //#region Methods
  @HostListener('window:scroll', [])

  public onWindowScroll(): void {
    if (this.windowService.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && this.windowService.pageYOffset
      || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  public scrollToTop(): any {
    return this.smoothScrollHandler();
  }

}

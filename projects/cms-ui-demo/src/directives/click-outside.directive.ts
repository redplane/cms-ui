import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  //#region Properties

  @Output()
  public clickOutside = new EventEmitter<HTMLElement>();

  //#endregion

  //#region Constructor

  public constructor(private readonly elementRef: ElementRef) {
  }

  //#endregion

  //#region Methods

  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit(target);
    }
  }

  //#endregion
}

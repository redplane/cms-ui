import {Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef} from '@angular/core';
import {v4, v4 as uuidv4} from 'uuid';
import {HtmlContent, IBannerButton, IBannerComponent} from '@cms-ui/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['alert-banner.component.scss']
})
export class AlertBannerComponent implements IBannerComponent {

  //#region Properties

  // Id of banner.
  @Input()
  public id: string;

  public message: string;

  // Handler for requesting banner dispose.
  // tslint:disable-next-line:variable-name
  private readonly _disposeRequestHandler: () => void;

  // Handler about click event.
  public clickHandler?: (bannerId: string, close: () => void) => void;

  // Handler which is triggered user clicks outside banner.
  public clickOutsideHandler?: (bannerId: string, close: () => void) => void;

  //#endregion

  //#region Events

  // tslint:disable-next-line:no-output-rename
  @Output('action-clicked')
  public readonly clickActionButtonEvent: EventEmitter<IBannerButton>;

  // Event which is raised when banner requests for its dispose.
  // tslint:disable-next-line:no-output-rename
  @Output('dispose-requesting')
  public readonly disposeRequestingEvent: EventEmitter<void>;

  //#endregion

  //#region Constructor

  public constructor(protected elementRef: ElementRef) {
    this.id = v4();
    this.message = '';

    // Event initialization.
    this.clickActionButtonEvent = new EventEmitter<IBannerButton>();
    this.disposeRequestingEvent = new EventEmitter<void>();

    this._disposeRequestHandler = (): void => {
      if (!this.disposeRequestingEvent) {
        return;
      }

      this.disposeRequestingEvent.next();
    };
  }

  //#endregion

  //#region Methods

  // Called when action button is clicked.
  public clickActionButton(actionButton: IBannerButton): void {

    if (!this.clickActionButtonEvent) {
      return;
    }

    // Button is disabled.
    if (actionButton.activeHandler && !actionButton.activeHandler()) {
      return;
    }

    if (actionButton.clickHandler) {
      actionButton.clickHandler(this.id, this._disposeRequestHandler);
    }

    this.clickActionButtonEvent.emit(actionButton);
  }

  // Called when banner is clicked.
  @HostListener('click', ['$event.target'])
  public handleBannerClick(): void {
    if (!this.clickHandler) {
      return;
    }

    this.clickHandler(this.id, this._disposeRequestHandler);
  }

  // Called when an element on document is clicked.
  @HostListener('document:click', ['$event.target'])
  public handleOutsideBannerClick(target: EventTarget): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (clickedInside) {
      return;
    }

    // Handler is not defined.
    if (!this.clickOutsideHandler) {
      return;
    }

    this.clickOutsideHandler(this.id, this._disposeRequestHandler);
  }

  //#endregion

}

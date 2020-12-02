import {Component, HostBinding, Inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Subscription} from 'rxjs';
import {SpinnerVisibilityChanged} from '../../models/implementations/spinner-visibility-changed';
import {SPINNER_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {Visibilities} from '../../enums/visibilities';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cms-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  //#region Properties

  // Id of loading spinner.
  // tslint:disable-next-line:variable-name
  private _id: string;

  // Visibility status.
  // tslint:disable-next-line:variable-name
  private _visibility: Visibilities;

  // Class which is applied to host component.
  // tslint:disable-next-line:variable-name
  private _hostClass: string;

  // Loading spinner template.
  // tslint:disable-next-line:no-input-rename
  @Input('spinner-template')
  public loadingSpinnerTemplate: TemplateRef<any> | undefined;

  // Subscription watch list.
  protected hookVisibilityChangedSubscription: Subscription | undefined;

  //#endregion

  //#region Accessors

  @Input()
  public set id(value: string) {
    this._id = value;

    if (this.hookVisibilityChangedSubscription && !this.hookVisibilityChangedSubscription.closed) {
      this.hookVisibilityChangedSubscription.unsubscribe();
    }

    // Register spinner visibility changed event.
    this.hookVisibilityChangedSubscription = this.spinnerService
      .hookVisibilityChangedAsync(value)
      .subscribe((visibilityChangedEvent: SpinnerVisibilityChanged) => this.handleVisibilityChangedEvent(visibilityChangedEvent));
  }

  public get id(): string {
    return this._id;
  }

  public get visibility(): Visibilities {
    return this._visibility;
  }

  @HostBinding('class.hidden')
  public get hostDisplay(): boolean {
    switch (this._visibility) {
      case Visibilities.visible:
        return false;

      default:
        return true;
    }
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SPINNER_SERVICE_PROVIDER) protected spinnerService: ISpinnerService) {
    this.id = uuid();

    this._id = uuid();
    this._visibility = Visibilities.visible;
    this._hostClass = '';
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {


  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {

    if (this.hookVisibilityChangedSubscription && !this.hookVisibilityChangedSubscription.closed) {
      this.hookVisibilityChangedSubscription.unsubscribe();
    }
  }

  // Handle visibility changed event.
  protected handleVisibilityChangedEvent(visibilityChangedEvent: SpinnerVisibilityChanged): void {
    this._visibility = visibilityChangedEvent.visibility;
  }

  //#endregion

}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Subject, Subscription} from 'rxjs';
import {SPINNER_SERVICE_PROVIDER} from '../../constants/injectors';
import {ISpinnerService} from '../../services/interfaces/spinner-service.interface';
import {DisplaySpinnerRequest} from '../../models';
import {DeleteSpinnerRequest} from '../../models/implementations/delete-spinner-request';
import {BasicSpinnerComponent} from './basic-spinner/basic-spinner.component';
import {filter} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cms-spinner-container',
  templateUrl: 'spinner-container.component.html',
  styleUrls: ['spinner-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Properties

  // Id of loading spinner.
  // tslint:disable-next-line:variable-name
  private _id: string;

  // Class which is applied to host component.
  // tslint:disable-next-line:variable-name
  private _hostClass: string;

  // Subject which emits spinner visibility event.
  // tslint:disable-next-line:variable-name
  private readonly _spinnerVisibilityEventSubject: Subject<DisplaySpinnerRequest | DeleteSpinnerRequest | undefined>;

  // Mapping between display request id & displayed component.
  // tslint:disable-next-line:variable-name
  private readonly _idToDisplayRequest: { [id: string]: DisplaySpinnerRequest };

  // Subscription watch list.
  protected hookVisibilityChangedSubscription: Subscription | undefined;

  // Subscription to handle local visibility request.
  // tslint:disable-next-line:variable-name
  private _localVisibilityRequestHandleSubscription: Subscription | undefined;

  // Area which spinner will be displayed.
  @ViewChild('content', {read: ViewContainerRef, static: false})
  public viewContainerRef: ViewContainerRef | undefined;

  //#endregion

  //#region Accessors

  @Input()
  public set id(value: string) {
    this._id = value;

    if (this.hookVisibilityChangedSubscription && !this.hookVisibilityChangedSubscription.closed) {
      this.hookVisibilityChangedSubscription.unsubscribe();
      this._spinnerVisibilityEventSubject.next(undefined);
    }

    // Register spinner visibility changed event.
    this.hookVisibilityChangedSubscription = this.spinnerService
      .hookSpinnerVisibilityEvent(value)
      .subscribe((event: DisplaySpinnerRequest | DeleteSpinnerRequest) => this._spinnerVisibilityEventSubject.next(event));
  }

  public get id(): string {
    return this._id;
  }

  public get displayRequestIds(): string[] {

    if (!this._idToDisplayRequest) {
      return [];
    }

    return Object.keys(this._idToDisplayRequest);
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SPINNER_SERVICE_PROVIDER) protected spinnerService: ISpinnerService,
                     protected readonly componentFactoryResolver: ComponentFactoryResolver,
                     protected readonly changeDetectorRef: ChangeDetectorRef,
                     private readonly injector: Injector) {
    this.id = uuid();

    this._id = uuid();
    this._hostClass = '';

    this._idToDisplayRequest = {};
    this._spinnerVisibilityEventSubject = new Subject<DisplaySpinnerRequest | DeleteSpinnerRequest | undefined>();
  }

  //#endregion

  //#region Methods

  public ngOnInit(): void {

    // Subscription registration.
    this._localVisibilityRequestHandleSubscription = this._spinnerVisibilityEventSubject
      .pipe(
        filter(event => event !== null && event !== undefined),
        filter(event => event instanceof DisplaySpinnerRequest || event instanceof DeleteSpinnerRequest)
      )
      .subscribe(event => {
        this.handleVisibilityChangedEvent(event);
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngAfterViewInit(): void {
    // Update component id to trigger spinner event.
    this.id = this._id || uuid();
  }

  // Called when component is destroyed.
  public ngOnDestroy(): void {

    this.hookVisibilityChangedSubscription?.unsubscribe();
    this._spinnerVisibilityEventSubject?.unsubscribe();
    this._localVisibilityRequestHandleSubscription?.unsubscribe();
  }

  // Handle visibility changed event.
  protected handleVisibilityChangedEvent(event: DisplaySpinnerRequest | DeleteSpinnerRequest | undefined): void {

    // Invalid view container ref.
    if (!this.viewContainerRef) {
      return;
    }

    if (event instanceof DisplaySpinnerRequest) {
      const displaySpinnerRequest = event as DisplaySpinnerRequest;

      let purge = false;
      if (displaySpinnerRequest.options) {
        purge = displaySpinnerRequest.options.purge || false;
      }

      // Destroy all view in the container.
      this.viewContainerRef.clear();

      if (purge) {
        const purgeRequest = new DeleteSpinnerRequest(displaySpinnerRequest.containerId);
        this.handleVisibilityChangedEvent(purgeRequest);
      }

      this.displaySpinner(displaySpinnerRequest);
      return;
    }

    if (event instanceof DeleteSpinnerRequest) {
      const deleteSpinnerRequest = event as DeleteSpinnerRequest;

      // Item index.
      let index = 0;

      // Go through every displayed request.
      while (true) {

        // Get request ids which has been registered before.
        const requestIds = Object.keys(this._idToDisplayRequest);

        if (!requestIds || !requestIds.length || index >= requestIds.length) {
          break;
        }

        const requestId = requestIds[index];

        // A specific request id is defined.
        if (deleteSpinnerRequest.id && deleteSpinnerRequest.id.length && requestId !== deleteSpinnerRequest.id) {
          index++;
          continue;
        }

        delete this._idToDisplayRequest[requestId];
      }

      // Destroy all view in the container.
      this.viewContainerRef.clear();

      // There is at least one display request. Display that one.
      const pendingRequestIds = Object.keys(this._idToDisplayRequest);
      if (pendingRequestIds && pendingRequestIds.length) {
        this.handleVisibilityChangedEvent(this._idToDisplayRequest[pendingRequestIds[pendingRequestIds.length - 1]]);
      }

      return;
    }
  }

  protected displaySpinner(displaySpinnerRequest: DisplaySpinnerRequest): void {

    if (!displaySpinnerRequest || !this.viewContainerRef) {
      return;
    }

    if (!displaySpinnerRequest.options || !displaySpinnerRequest.options.componentFactory) {
      const defaultComponentFactory = this.componentFactoryResolver.resolveComponentFactory(BasicSpinnerComponent);
      const basicSpinnerComponent = defaultComponentFactory.create(this.injector);
      const insertedViewRef = this.viewContainerRef.insert(basicSpinnerComponent.hostView);
      insertedViewRef.markForCheck();
      this._idToDisplayRequest[displaySpinnerRequest.id] = displaySpinnerRequest;
      return;
    }

    const componentFactory = displaySpinnerRequest.options.componentFactory;
    const spinnerComponent = componentFactory.create(this.injector);
    const viewRef = this.viewContainerRef.insert(spinnerComponent.hostView);
    viewRef.markForCheck();
    this._idToDisplayRequest[displaySpinnerRequest.id] = displaySpinnerRequest;

  }

  //#endregion

}

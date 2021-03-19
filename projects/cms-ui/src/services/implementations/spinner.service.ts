import {ISpinnerService} from '../interfaces';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {DisplaySpinnerRequest} from '../../models/implementations/display-spinner-request';
import {v4 as uuidv4} from 'uuid';
import {DeleteSpinnerRequest} from '../../models/implementations/delete-spinner-request';
import {ISpinnerOptions} from '../../models';

export class SpinnerService implements ISpinnerService {

  //#region Properties

  // Mapping between container id & visibility emitter.
  // tslint:disable-next-line:variable-name
  private readonly _containerIdToVisibilityEvent: {
    [containerId: string]
      : Subject<DisplaySpinnerRequest | DeleteSpinnerRequest>
  };

  // Container ids which already registered.
  // tslint:disable-next-line:variable-name
  private readonly _containerIds: string[];

  //#endregion

  //#region Constructor

  public constructor() {
    this._containerIdToVisibilityEvent = {};
    this._containerIds = [];
  }

  //#endregion

  //#region Methods

  public displaySpinner(containerId: string, options?: ISpinnerOptions): string {

    // Initialize request id.
    const requestId = uuidv4();

    const displaySpinnerRequest = new DisplaySpinnerRequest(containerId, requestId, options);
    this.broadcastSpinnerEvent(displaySpinnerRequest);
    return requestId;
  }

  public deleteSpinner(containerId: string, id?: string): void {

    // Delete spinner request.
    const deleteSpinnerRequest = new DeleteSpinnerRequest(containerId, id);

    // Deleted requests is smaller than container request.
    this.broadcastSpinnerEvent(deleteSpinnerRequest);
  }

  public deleteSpinners(containerId?: string): void {

    if (!containerId) {

      for (const displayedSpinnerId of this._containerIds) {
        const deleteSpinnerRequest = new DeleteSpinnerRequest(displayedSpinnerId);
        this.broadcastSpinnerEvent(deleteSpinnerRequest);
      }

      this._containerIds.splice(0);
      return;
    }

    this.broadcastSpinnerEvent(new DeleteSpinnerRequest(containerId));
  }

  // Hook visibility changed event.
  public hookSpinnerVisibilityEvent(containerId: string): Observable<DisplaySpinnerRequest | DeleteSpinnerRequest> {

    if (!this._containerIdToVisibilityEvent[containerId]) {
      this._containerIdToVisibilityEvent[containerId] = new ReplaySubject(1);
    }

    return this._containerIdToVisibilityEvent[containerId].asObservable();
  }

  //#endregion

  //#region Internal methods

  // Broadcast visibility event.
  protected broadcastSpinnerEvent(event: DisplaySpinnerRequest | DeleteSpinnerRequest): void {

    if (!event || !event.containerId) {
      return;
    }

    if (!this._containerIdToVisibilityEvent[event.containerId]) {
      this._containerIdToVisibilityEvent[event.containerId] = new ReplaySubject<DisplaySpinnerRequest | DeleteSpinnerRequest>(1);
    }

    if (event instanceof DisplaySpinnerRequest) {
      const displaySpinnerRequest = event as DisplaySpinnerRequest;
      const itemIndex = this._containerIds.indexOf(displaySpinnerRequest.containerId);
      if (itemIndex < 0) {
        this._containerIds.push(displaySpinnerRequest.containerId);
      }
    }

    this._containerIdToVisibilityEvent[event.containerId].next(event);
  }

  //#endregion

}

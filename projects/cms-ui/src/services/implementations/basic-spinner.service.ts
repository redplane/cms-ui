import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {cloneDeep} from 'lodash-es';
import {ISpinnerService} from '../interfaces/spinner-service.interface';
import {DisplaySpinnerRequest} from '../../models/implementations/display-spinner-request';
import {SpinnerVisibilityChangedEvent} from '../../models/implementations/spinner-visibility-changed-event';
import {Visibilities} from '../../enums/visibilities';
import {SpinnerVisibilityChanged} from '../../models/implementations/spinner-visibility-changed';

export class BasicSpinnerService implements ISpinnerService {

  //#region Properties

  // List of request ids.
  // tslint:disable-next-line:variable-name
  private readonly _containerIdToRequests: { [containerId: string]: DisplaySpinnerRequest[] };

  // Mapping between container id & visibility emitter.
  // tslint:disable-next-line:variable-name
  private readonly _containerIdToVisibilityEvent: { [containerId: string]: Subject<SpinnerVisibilityChangedEvent> };

  //#endregion

  //#region Constructor

  public constructor() {
    this._containerIdToRequests = {};
    this._containerIdToVisibilityEvent = {};
  }

  //#endregion

  //#region Methods

  public displaySpinner(containerId: string): string {

    const requestId = uuidv4();

    if (!(this._containerIdToRequests[containerId] && this._containerIdToRequests[containerId].length)) {
      this._containerIdToRequests[containerId] = [];
    }

    const request = new DisplaySpinnerRequest(requestId, containerId);
    this._containerIdToRequests[containerId].push(request);

    this.broadcastVisibilityEvent(containerId, requestId, Visibilities.visible);
    return requestId;
  }

  public deleteSpinner(containerId: string, id?: string): void {

    if (!this._containerIdToRequests[containerId]) {
      return;
    }

    const requests = cloneDeep(this._containerIdToRequests[containerId]);
    let index = 0;
    while (index < requests.length) {

      const request = requests[index];
      if (request.containerId !== containerId) {
        index++;
        continue;
      }

      if (id && id.length && request.id !== id) {
        index++;
        continue;
      }

      requests.splice(index, 1);
    }

    // Deleted requests is smaller than container request.
    this._containerIdToRequests[containerId] = requests;
    const shouldSpinnerDisplayed = (requests && requests.length);
    this.broadcastVisibilityEvent(containerId, id || '', shouldSpinnerDisplayed ? Visibilities.visible : Visibilities.hidden);
  }

  public deleteSpinners(designatedContainerId?: string): void {

    if (!this._containerIdToRequests) {
      return;
    }

    // Get list of containers.
    const containerIds = Object.keys(this._containerIdToRequests);
    if (!containerIds || !containerIds.length) {
      return;
    }

    for (const id of containerIds) {

      if ((designatedContainerId && designatedContainerId.length) && designatedContainerId !== id) {
        continue;
      }

      delete this._containerIdToRequests[id];
      this.broadcastVisibilityEvent(id, '', Visibilities.hidden);
    }
  }

  // Hook visibility changed event.
  public hookVisibilityChangedAsync(containerId: string): Observable<SpinnerVisibilityChanged> {

    if (!this._containerIdToVisibilityEvent[containerId]) {
      this._containerIdToVisibilityEvent[containerId] = new ReplaySubject(1);
    }

    return this._containerIdToVisibilityEvent[containerId].asObservable();
  }

  //#endregion

  //#region Internal methods

  // Broadcast visibility event.
  protected broadcastVisibilityEvent(containerId: string, requestId: string, visibility: Visibilities): void {

    const event = new SpinnerVisibilityChangedEvent(containerId, requestId, visibility);
    if (!this._containerIdToVisibilityEvent[containerId]) {
      this._containerIdToVisibilityEvent[containerId] = new ReplaySubject<SpinnerVisibilityChangedEvent>(1);
    }

    this._containerIdToVisibilityEvent[containerId].next(event);

  }

  //#endregion


}

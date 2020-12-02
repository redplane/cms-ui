import {SPINNER_SERVICE_PROVIDER} from '@med-advisor/core-ui';
import {TestBed} from '@angular/core/testing';
import {SpinnerModule} from '../modules/spinner/spinner.module';
import {v4 as uuid} from 'uuid';
import {finalize, take} from 'rxjs/operators';
import {Visibilities} from '@app/modules/shared/two-column-layout/enums/visibility.enum';
import {forkJoin, Subscription} from 'rxjs';
import {SpinnerVisibilityChanged} from '../models/spinner-visibility-changed';
import {BasicSpinnerService} from './basic-spinner.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';


describe('Unit tests for SpinnerService', () => {

  //#region Properties

  let subscription: Subscription;

  //#endregion

  //#region Setup

  beforeEach(() => {

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        SpinnerModule.forRoot()
      ]
    });

    subscription = new Subscription();
  });

  afterEach(() => {

    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  });

  //#endregion

  //#region Unit tests

  it('Spinner is displayed when request is sent', (done: DoneFn) => {

    const containerId = uuid();
    const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
    const hookSpinnerVisibilitySubscription = spinnerService.hookVisibilityChangedAsync(containerId)
      .pipe(
        take(1)
      )
      .subscribe(event => {
        expect(event.visibility).toEqual(Visibilities.visbible);
        done();
      });

    spinnerService.displaySpinner(containerId);
    subscription.add(hookSpinnerVisibilitySubscription);
  });

  it('Spinner never hidden when display request is kept sending', (done: DoneFn) => {
    const containerId = uuid();
    const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
    const requestAmount = 3;
    const hookSpinnerVisibilitySubscription = spinnerService.hookVisibilityChangedAsync(containerId)
      .pipe(
        take(requestAmount),
        finalize(() => done())
      )
      .subscribe(event => {
        expect(event.visibility).toEqual(Visibilities.visbible);
      });

    subscription.add(hookSpinnerVisibilitySubscription);

    // Emit event.
    for (let i = 0; i < requestAmount; i++) {
      spinnerService.displaySpinner(containerId);
    }
  });

  it('Spinner is not hidden when not every request is deleted', (done: DoneFn) => {
    const containerId = uuid();
    const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
    const requestAmount = 3;
    const addedRequestIds: string[] = [];

    // Emit event.
    for (let i = 0; i < requestAmount; i++) {
      const addedSpinnerId = spinnerService.displaySpinner(containerId);
      addedRequestIds.push(addedSpinnerId);
    }

    for (let i = 0; i < requestAmount - 1; i++) {
      spinnerService.deleteSpinner(containerId, addedRequestIds[i]);
    }

    const hookSpinnerVisibilitySubscription = spinnerService
      .hookVisibilityChangedAsync(containerId)
      .pipe(
        take(1),
        finalize(() => done())
      )
      .subscribe(event => {
        expect(event.visibility).toEqual(Visibilities.visbible);
      });

    subscription.add(hookSpinnerVisibilitySubscription);
  });

  it('Spinner is hidden when every request is deleted', (done: DoneFn) => {
    const containerId = uuid();
    const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
    const requestAmount = 3;
    const addedRequestIds: string[] = [];

    // Emit event.
    for (let i = 0; i < requestAmount; i++) {
      const addedSpinnerId = spinnerService.displaySpinner(containerId);
      addedRequestIds.push(addedSpinnerId);
    }

    for (let j = 0; j < addedRequestIds.length; j++) {
      spinnerService.deleteSpinner(containerId, addedRequestIds[j]);
    }

    const hookSpinnerVisibilitySubscription = spinnerService
      .hookVisibilityChangedAsync(containerId)
      .pipe(
        take(1),
        finalize(() => done())
      )
      .subscribe(event => {
        expect(event.visibility).toEqual(Visibilities.hidden);
      });

    subscription.add(hookSpinnerVisibilitySubscription);
  });

  it('Spinner is hidden when delete spinner with container id only', (done: DoneFn) => {
    const containerId = uuid();
    const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
    const requestAmount = 3;
    const addedRequestIds: string[] = [];

    // Emit event.
    for (let i = 0; i < requestAmount; i++) {
      const addedSpinnerId = spinnerService.displaySpinner(containerId);
      addedRequestIds.push(addedSpinnerId);
    }

    // Delete requests from a specific container.
    spinnerService.deleteSpinner(containerId);

    const hookSpinnerVisibilitySubscription = spinnerService
      .hookVisibilityChangedAsync(containerId)
      .pipe(
        take(1),
        finalize(() => done())
      )
      .subscribe(event => {
        expect(event.visibility).toEqual(Visibilities.hidden);
      });

    subscription.add(hookSpinnerVisibilitySubscription);
  });

  it('Spinner is hidden when deleteSpinners is called with specific container id',
    (done: DoneFn) => {

      const containerId = uuid();
      const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
      const requestAmount = 3;
      const addedRequestIds: string[] = [];

      // Emit event.
      for (let i = 0; i < requestAmount; i++) {
        const addedSpinnerId = spinnerService.displaySpinner(containerId);
        addedRequestIds.push(addedSpinnerId);
      }

      // Delete requests from a specific container.
      spinnerService.deleteSpinners(containerId);

      const hookSpinnerVisibilitySubscription = spinnerService
        .hookVisibilityChangedAsync(containerId)
        .pipe(
          take(1),
          finalize(() => done())
        )
        .subscribe(event => {
          expect(event.visibility).toEqual(Visibilities.hidden);
        });

      subscription.add(hookSpinnerVisibilitySubscription);
    });

  it('All spinners are hidden when deleteSpinners is called without specific container id',
    (done: DoneFn) => {

      const containerIds = [uuid(), uuid(), uuid()];

      const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
      const requestAmount = 3;

      // Emit event.
      for (let i = 0; i < requestAmount; i++) {
        for (const containerId of containerIds) {
          spinnerService.displaySpinner(containerId);
        }
      }

      // Delete requests from a specific container.
      spinnerService.deleteSpinners();

      const hookSpinnerVisibilityObservables = containerIds.map(containerId => {
        return spinnerService.hookVisibilityChangedAsync(containerId)
          .pipe(
            take(1)
          );
      });

      const hookSpinnerVisibilitySubscription = forkJoin(hookSpinnerVisibilityObservables)
        .pipe(
          take(1),
          finalize(() => done())
        )
        .subscribe((visibilities: SpinnerVisibilityChanged[]) => {
          for (const event of visibilities) {
            expect(event.visibility).toEqual(Visibilities.hidden);
          }
        });

      subscription.add(hookSpinnerVisibilitySubscription);
    });

  it('Spinner is still visible when pass invalid container id to deleteSpinner',
    (done: DoneFn) => {

      const containerIds = [uuid(), uuid(), uuid()];

      const spinnerService = TestBed.inject(SPINNER_SERVICE_PROVIDER);
      const requestAmount = 3;

      // Emit event.
      for (let i = 0; i < requestAmount; i++) {
        for (const containerId of containerIds) {
          spinnerService.displaySpinner(containerId);
        }
      }

      // Delete requests from a specific container.
      spinnerService.deleteSpinners();

      const hookSpinnerVisibilityObservables = containerIds.map(containerId => {
        return spinnerService.hookVisibilityChangedAsync(containerId)
          .pipe(
            take(1)
          );
      });

      const hookSpinnerVisibilitySubscription = forkJoin(hookSpinnerVisibilityObservables)
        .pipe(
          take(1),
          finalize(() => done())
        )
        .subscribe((visibilities: SpinnerVisibilityChanged[]) => {
          for (const event of visibilities) {
            expect(event.visibility).toEqual(Visibilities.hidden);
          }
        });

      subscription.add(hookSpinnerVisibilitySubscription);
    });

  //#endregion

});

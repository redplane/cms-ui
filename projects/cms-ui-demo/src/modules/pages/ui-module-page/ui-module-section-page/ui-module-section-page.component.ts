import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {
  DetailedUiModuleSectionSelectedChannelEvent
} from '../../../../models/channel-events/ui-modules/detailed-ui-module-section-selected.channel-event';
import {
  DetailedUiModuleSectionSelectedMessage
} from '../../../../models/channel-events/detailed-ui-module-section-selected-message';
import {switchMap} from 'rxjs/operators';
import {SECTION_SERVICE} from '../../../../constants/injectors';
import {ISectionService} from '../../../../services/interfaces/section-service.interface';
import {SectionViewModel} from '../../../../view-models/section.view-model';
import {merge as lodashMerge} from 'lodash-es';

@Component({
  selector: 'ui-module-section-page',
  templateUrl: './ui-module-section-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiModuleSectionPageComponent implements OnInit, OnDestroy {

  //#region Properties

  // Section information.
  private __section: SectionViewModel | null;

  protected readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  public get section(): SectionViewModel | null {
    return this.__section;
  }

  //#endregion

  //#region Constructor

  public constructor(
    @Inject(MESSAGE_BUS_SERVICE_PROVIDER)
    protected readonly _messageBusService: INgRxMessageBusService,
    @Inject(SECTION_SERVICE)
    protected readonly _sectionService: ISectionService,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {
    this.__section = null;
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hooks

  public ngOnInit(): void {

    const hookUiModuleSectionSelectedSubscription = this._messageBusService
      .hookTypedMessageChannel<DetailedUiModuleSectionSelectedMessage>(new DetailedUiModuleSectionSelectedChannelEvent())
      .pipe(
        switchMap(message => {
          return this._sectionService.loadSectionByIdAsync(message.sectionId);
        })
      )
      .subscribe(section => {
        this.__section = lodashMerge(new SectionViewModel(''), section);
      });
    this._subscription.add(hookUiModuleSectionSelectedSubscription);

  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion
}

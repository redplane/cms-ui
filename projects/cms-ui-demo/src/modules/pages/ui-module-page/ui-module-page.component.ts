import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';
import {UI_MODULE_PAGE_SERVICE, UI_MODULE_SERVICE} from '../../../constants/injectors';
import {UiModulePageService} from './ui-module-page.service';
import {IUiModuleService} from '../../../services/interfaces/ui-module-service.interface';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {
  DetailedUiModuleSelectedChannelEvent
} from '../../../models/channel-events/ui-modules/detailed-ui-module-selected.channel-event';
import {switchMap} from 'rxjs/operators';
import {UiModuleViewModel} from '../../../view-models/ui-modules/ui-module.view-model';
import {DetailedUiModuleSelectedMessage} from '../../../models/channel-events/detailed-ui-module-selected-message';
import {cloneDeep} from 'lodash-es';
import {ScreenCodes} from '../../../constants/screen.codes';

@Component({
  selector: 'ui-module-page',
  templateUrl: 'ui-module-page.component.html',
  styleUrls: ['ui-module-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiModulePageComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Properties

  // Main title.
  // tslint:disable-next-line:variable-name
  private _title: string;

  // Secondary title.
  // tslint:disable-next-line:variable-name
  private _secondaryTitle: string;

  // Ui module
  private __uiModule?: UiModuleViewModel;

  // Instance of selected ui module.
  private __selectedUiModule: UiModuleViewModel | null;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Accessors

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  // Primary title.
  public get title(): string {
    return this._title;
  }

  // Secondary title.
  public get secondaryTitle(): string {
    return this._secondaryTitle;
  }

  public get uiModule(): UiModuleViewModel | undefined {
    return this.__uiModule;
  }

  public get selectedUiModule(): UiModuleViewModel | null{
    return this.__selectedUiModule;
  }

  public get screenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  //#endregion

  //#region Constructor

  public constructor(
    @Inject(UI_MODULE_PAGE_SERVICE) protected readonly _uiModulePageService: UiModulePageService,
    @Inject(UI_MODULE_SERVICE) protected readonly _uiModuleService: IUiModuleService,
    @Inject(MESSAGE_BUS_SERVICE_PROVIDER) protected readonly _messageBusService: INgRxMessageBusService,
    protected readonly _changeDetectorRef: ChangeDetectorRef) {

    this._title = '';
    this._secondaryTitle = '';
    this.__selectedUiModule = null;

    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    // Hook setting changed subscription
    const hookSettingChangedSubscription = this._uiModulePageService
      .hookLayoutSettingsChanged()
      .subscribe(setting => {
        this._title = setting.title || '';
        this._secondaryTitle = setting.secondaryTitle || '';
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookSettingChangedSubscription);

    const hookDetailedUiModuleSelectedSubscription = this._messageBusService
      .hookTypedMessageChannel<DetailedUiModuleSelectedMessage>(new DetailedUiModuleSelectedChannelEvent())
      .pipe(
        switchMap(({id}) => {
          // TODO: Display spinner.
          return this._uiModuleService.loadUiModuleByIdAsync(id);
        })
      )
      .subscribe((uiModule) => {
        this.__uiModule = cloneDeep(uiModule);
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookDetailedUiModuleSelectedSubscription);
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion
}

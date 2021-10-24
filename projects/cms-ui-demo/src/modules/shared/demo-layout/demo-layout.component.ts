import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ComponentFactoryResolver,
  HostBinding,
  Inject, Injector,
  OnDestroy,
  OnInit,
  TemplateRef, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  DEMO_LAYOUT_ITEMS_BUILDER_PROVIDER,
  DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER,
  DEMO_LAYOUT_SERVICE_PROVIDER
} from '../../../constants/injectors';
import {ReplaySubject, Subject, Subscription} from 'rxjs';
import {DemoLayoutService} from './demo-layout.service';
import {BaseDemoLayoutItemsBuilder} from './demo-layout-items/base-demo-layout-items.builder';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-layout',
  templateUrl: 'demo-layout.component.html',
  styleUrls: ['demo-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Properties

  // Main title.
  // tslint:disable-next-line:variable-name
  private _title: string;

  // Secondary title.
  // tslint:disable-next-line:variable-name
  private _secondaryTitle: string;

  // Demo items template.
  private _demoItemsTemplateRef: TemplateRef<any> | null = null;

  // Subscription watch list.
  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  //#endregion

  //#region Events

  // Event about layout readiness.
  public readonly readyEvent: Subject<void> = new ReplaySubject(1);

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

  // Demo items layout.
  @ViewChild('demoItemsLayout', {read: ViewContainerRef})
  public demoItemsLayout!: ViewContainerRef;

  //#endregion

  //#region Constructor

  public constructor(@Inject(DEMO_LAYOUT_SERVICE_PROVIDER) protected readonly demoLayoutService: DemoLayoutService,
                     @Inject(DEMO_LAYOUT_ITEMS_TEMPLATE_TYPE_PROVIDER) protected readonly demoLayoutItemsType: Type<any>,
                     protected readonly componentFactoryResolver: ComponentFactoryResolver,
                     protected changeDetectorRef: ChangeDetectorRef) {
    this._title = '';
    this._secondaryTitle = '';

    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle

  public ngOnInit(): void {

    // Hook setting changed subscription
    const hookSettingChangedSubscription = this.demoLayoutService
      .hookLayoutSettingsChanged()
      .subscribe(setting => {
        this._title = setting.title || '';
        this._secondaryTitle = setting.secondaryTitle || '';
        this.changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookSettingChangedSubscription);
  }

  public ngAfterViewInit(): void {

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(this.demoLayoutItemsType);

    // const componentRef = componentFactory.create(this.injector);
    this.demoItemsLayout.clear();
    const componentRef = this.demoItemsLayout.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  //#endregion

  //#region Methods

  //#endregion
}

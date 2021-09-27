import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ValidationSummarizerDemoScreenCodeConstant} from '../../constants/screen-codes/validation-summarizer-demo-screen-code.constant';
import {IDemoLayoutService} from '../../services/interfaces/demo-layout-service.interface';
import {DEMO_LAYOUT_SERVICE_PROVIDER} from '../../constants/injection-token.constant';
import {ValidationSummarizerSectionsConstant} from '../../constants/validation-summarizer-sections.constant';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {ScrollToItemChannelEvent} from '../../../src/models/channel-events/scroll-to-item.channel-event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'validation-summarizer-demo',
  templateUrl: 'validation-summarizer-demo.component.html',
  styleUrls: ['validation-summarizer-demo.component.scss']
})
export class ValidationSummarizerDemoComponent implements OnInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  protected _subscription: Subscription;

  // Tracks the item corresponding to the section
  public currentItem: string;

  public activeClasses = 'list-group-item list-group-item-action list-group-item-primary';

  public inactiveClasses = 'list-group-item list-group-item-action list-group-item-light';
  // Define section on page
  public validationSummarizerSectionsConstant = ValidationSummarizerSectionsConstant;

  //#endregion

  //#region Services

  protected readonly demoLayoutService: IDemoLayoutService;

  protected readonly messageBusService: INgRxMessageBusService;

  //#endregion

  //#region Accessors

  public get validationSummarizerDemoScreenCodes(): typeof ValidationSummarizerDemoScreenCodeConstant {
    return ValidationSummarizerDemoScreenCodeConstant;
  }

  //#endregion

  //#region Constructor

  public constructor(injector: Injector) {

    this.demoLayoutService = injector.get(DEMO_LAYOUT_SERVICE_PROVIDER);
    this.messageBusService = injector.get(MESSAGE_BUS_SERVICE_PROVIDER);
    this.currentItem = this.validationSummarizerSectionsConstant.descriptionSection;
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycles

  public ngOnInit(): void {
    this.demoLayoutService.changeLayoutSetting({
      title: 'Validation Summarizer',
      secondaryTitle: 'Demo'
    });
  }

  public ngOnDestroy(): void {

    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  public scrollToItem(descriptionSection: string): void {
    this.currentItem = descriptionSection;
    this.messageBusService.addTypedMessage(new ScrollToItemChannelEvent(), descriptionSection);
  }

  public resetCurrentItem(): void {
    this.currentItem = this.validationSummarizerSectionsConstant.descriptionSection;
  }

  //#endregion

}

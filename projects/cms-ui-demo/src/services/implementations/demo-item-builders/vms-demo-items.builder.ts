import {BaseDemoLayoutItemsBuilder} from '../../../modules/shared/demo-layout/demo-layout-items/base-demo-layout-items.builder';
import {Inject, Injectable} from '@angular/core';
import {DemoLayoutItem} from '../../../modules/shared/demo-layout/demo-layout-items/demo-layout-item';
import {Observable, of} from 'rxjs';
import {ISmartNavigatorService, SMART_NAVIGATOR_PROVIDER} from '@cms-ui/core';
import {ValidationSummarizerDemoScreenCodes} from '../../../constants/screen-codes/validation-summarizer-demo-screen-codes';

@Injectable()
export class VmsDemoItemsBuilder extends BaseDemoLayoutItemsBuilder {

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_PROVIDER)
                     protected readonly smartNavigatorService: ISmartNavigatorService) {
    super();
  }

  //#endregion

  //#region Methods

  public loadAvailableDemoItemsAsync(): Observable<DemoLayoutItem[]> {
    const items: DemoLayoutItem[] = [
      {
        title: 'DEMO_LAYOUT.MODULE_DESCRIPTION',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withModuleDescription)
          .toString(),
        routerLinkActive: 'active',
        routerLinkActiveOptions: {exact: true},
        children: [
          {
            title: 'DEMO_LAYOUT.MODULE_API',
            routerLink: this.smartNavigatorService
              .buildUrlTree(ValidationSummarizerDemoScreenCodes.withApi)
              .toString(),
            routerLinkActive: 'active'
          }
        ]
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.BASIC_USAGE',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withBasicValidator)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.VISIBILITY_HANDLER',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withVisibilityHandler)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.CUSTOM_VALIDATOR',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withCustomValidator)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.CHILD_VALIDATOR_MODULE',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withChildValidatorModule)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.VALIDATION_ITEM_TEMPLATE',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withValidationItemTemplate)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.MESSAGE_TEMPLATE',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withMessageTemplate)
          .toString(),
        routerLinkActive: 'active'
      },
      {
        title: 'VALIDATION_SUMMARIZER_DEMO.TEMPLATE_DRIVEN_SUPPORT',
        routerLink: this.smartNavigatorService
          .buildUrlTree(ValidationSummarizerDemoScreenCodes.withTemplateDriven)
          .toString(),
        routerLinkActive: 'active'
      }
    ];

    return of(items);
  }

  //#endregion

}

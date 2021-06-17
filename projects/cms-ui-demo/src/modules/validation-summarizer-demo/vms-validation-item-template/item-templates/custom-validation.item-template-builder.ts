import {IValidationSummarizerItemTemplateBuilder, ValidationItemBuildContext} from '@cms-ui/core';
import {Observable, of} from 'rxjs';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {CustomValidationItemTemplateComponent} from './custom-validation-item-template.component';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';
import {ValidationKeys} from '../../../../constants/validation-keys';

@Injectable()
export class CustomValidationItemTemplateBuilder implements IValidationSummarizerItemTemplateBuilder {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _validValidationKeys: string[];

  //#endregion

  //#region Constructor

  public constructor(private readonly injector: Injector) {
    this._validValidationKeys = [ValidationKeys.notSmallerThan, ValidationKeys.notGreaterThan, ValidationKeys.isEven];
  }


  //#endregion

  //#region Methods

  public ableToBuildTemplateAsync(context: ValidationItemBuildContext): Observable<boolean> {

    const validationMessage = context.validationMessage;
    if (!validationMessage || !validationMessage.key || !validationMessage.key.length) {
      return of(false);
    }

    const index = this._validValidationKeys.indexOf(validationMessage.key);
    return of(index !== -1);
  }

  public buildTemplateAsync(context: ValidationItemBuildContext): Observable<ComponentRef<any>> {
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const componentFactory = componentFactoryResolver
      .resolveComponentFactory(CustomValidationItemTemplateComponent);

    const childInjector = Injector.create({
      providers: [
        {
          provide: VALIDATION_ITEM_CONTEXT_PROVIDER,
          useValue: context
        }
      ]
    });

    const componentRef = componentFactory.create(childInjector);
    return of(componentRef);
  }

  //#endregion

}

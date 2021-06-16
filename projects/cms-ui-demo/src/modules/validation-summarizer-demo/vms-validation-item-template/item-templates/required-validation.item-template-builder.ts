import {IValidationSummarizerItemTemplateBuilder, ValidationItemBuildContext} from '@cms-ui/core';
import {Observable, of} from 'rxjs';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {RequiredValidationItemTemplateComponent} from './required-validation-item-template.component';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';

@Injectable()
export class RequiredValidationItemTemplateBuilder implements IValidationSummarizerItemTemplateBuilder {

  //#region Constructor

  public constructor(private readonly injector: Injector) {
  }


  //#endregion

  //#region Methods

  public ableToBuildTemplateAsync(context: ValidationItemBuildContext): Observable<boolean> {
    return of(true);
  }

  public buildTemplateAsync(context: ValidationItemBuildContext): Observable<ComponentRef<any>> {

    console.log(context);
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const componentFactory = componentFactoryResolver
      .resolveComponentFactory(RequiredValidationItemTemplateComponent);

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

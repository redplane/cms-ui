import {IValidationSummarizerItemTemplateBuilder, ValidationItemBuildContext} from '@cms-ui/core';
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {VALIDATION_ITEM_CONTEXT_PROVIDER} from '../../../../constants/injection-token.constant';
import {DefaultValidationItemTemplateComponent} from './default-validation-item-template.component';

@Injectable()
export class DefaultValidationItemTemplateBuilder implements IValidationSummarizerItemTemplateBuilder {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _builtInValidationKeys: string[];

  //#endregion

  //#region Constructor

  constructor(private readonly injector: Injector) {
    this._builtInValidationKeys = ['required', 'minlength', 'maxlength', 'pattern', 'min', 'max'];
  }

//#endregion

  //#region Methods

  public ableToBuildTemplateAsync(context: ValidationItemBuildContext): Observable<boolean> {

    // Get the validation message.
    const validationMessage = context.validationMessage;
    if (!validationMessage) {
      return of(false);
    }

    const index = this._builtInValidationKeys.indexOf(validationMessage.key);
    if (index < 0) {
      return of(false);
    }

    return of(true);
  }

  public buildTemplateAsync(context: ValidationItemBuildContext): Observable<ComponentRef<any>> {
    const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    const componentFactory = componentFactoryResolver
      .resolveComponentFactory(DefaultValidationItemTemplateComponent);

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

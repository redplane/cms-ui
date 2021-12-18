import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {ISmartNavigatorService, SMART_NAVIGATOR_SERVICE} from '@cms-ui/core';
import {ScreenCodes} from '../../constants/screen.codes';
import {CATEGORY_SERVICE} from '../../constants/injectors';
import {ICategoryService} from '../../services/interfaces/category-service.interface';
import {Subscription} from 'rxjs';
import {Category} from '../../models/category';
import {CategoryViewModel} from '../../view-models/category.view-model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing-page',
  templateUrl: 'landing-page.component.html',
  styleUrls: ['landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {

  //#region Properties

  private __categories: Category[];

  protected readonly _subscription: Subscription;

  //#endregion

  //#region Accessor

  public get categories(): CategoryViewModel[] {
    return this.__categories;
  }

  @HostBinding('class')
  public get hostClass(): string {
    return 'page';
  }

  public get screenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(SMART_NAVIGATOR_SERVICE) protected smartNavigatorService: ISmartNavigatorService,
                     @Inject(CATEGORY_SERVICE) protected readonly categoryService: ICategoryService,
                     protected readonly _changeDetectorRef: ChangeDetectorRef) {
    this.__categories = [];
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Life cycle hook

  public ngOnInit(): void {

    const hookCategoriesSubscription = this.categoryService.loadCategoriesAsync()
      .subscribe(categories => {
        this.__categories = categories;
        this._changeDetectorRef.markForCheck();
      });
    this._subscription.add(hookCategoriesSubscription);
  }

  //#endregion
}

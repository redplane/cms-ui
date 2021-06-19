import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollTopComponent} from '../../shared/scroll-top/scroll-top.component';
import {WINDOW_PROVIDERS} from '../../../services/implementations/app-window.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollTopComponent
  ],
  exports: [
    ScrollTopComponent
  ],
  providers: [WINDOW_PROVIDERS]
})
export class ScrollTopModule {

}

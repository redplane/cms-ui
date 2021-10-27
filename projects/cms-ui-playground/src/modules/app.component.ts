import { Component } from '@angular/core';

@Component({
  selector: 'body',
  template: `
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'cms-ui-playground';
}

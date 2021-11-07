import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'validation-summarizer',
    loadChildren: () => import('./validation-summarizer-demo-pages/validation-summarizer-demo-layout.module')
      .then(m => m.ValidationSummarizerDemoLayoutModule)
  },
  {
    path: 'multiple-validation-summarizer',
    loadChildren: () => import('./multiple-validation-summarizer-demo-pages/basic-multiple-validation-summarizer/basic-multiple-validation-summarizer.module')
      .then(m => m.BasicMultipleValidationSummarizerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

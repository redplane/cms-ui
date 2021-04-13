import {NgModule} from '@angular/core';
import {ToStaticFileContentPipe} from '../../shared/pipe/to-static-file-content.pipe';

@NgModule({
  declarations: [ToStaticFileContentPipe],
  exports: [ToStaticFileContentPipe]
})

export class ToStaticFileContentModule {}

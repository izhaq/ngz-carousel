import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgzCarouselModule} from './components/ngz-carousel/ngz-carousel.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [NgzCarouselModule]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error(
        'SharedComponentsModule is loaded already. Import it in th app only'
      );
    }
  }
}

import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel/carousel-item/carousel-item.directive';
import { CarouselSelectorDirective } from './carousel/carousel-selector/carousel-selector.directive';
import {CarouselService} from './carousel/services/carousel.service';

@NgModule({
  declarations: [CarouselComponent, CarouselItemDirective, CarouselSelectorDirective],
  imports: [
    CommonModule
  ],
  providers: [CarouselService],
  exports: [CarouselComponent, CarouselItemDirective]
})

export class NgzCarouselModule {
  constructor(@Optional() @SkipSelf() parentModule: NgzCarouselModule) {
    if (parentModule) {
      throw new Error(
        'CostumeChartsModule is loaded already. Import it in th app only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgzCarouselModule,
      providers: [ CarouselService ]
    };
  }
}

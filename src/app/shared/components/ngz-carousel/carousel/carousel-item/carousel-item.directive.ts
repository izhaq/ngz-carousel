import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[ngzCarouselItem]'
})
export class CarouselItemDirective {

  constructor(public tpl: TemplateRef<any>) { }

}

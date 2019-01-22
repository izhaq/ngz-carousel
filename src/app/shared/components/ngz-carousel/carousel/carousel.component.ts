import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  Renderer2, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import {CarouselItemDirective} from './carousel-item/carousel-item.directive';
import {CarouselSelectorDirective} from './carousel-selector/carousel-selector.directive';
import {resizeObservable} from './services/resize-observable';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';
import {CarouselService} from './services/carousel.service';

@Component({
  selector: 'ngz-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnInit {

  @Input() items: any[] = [];
  @Input() visibleItems = 5;
  @Input() showPrevNextButtons = true;
  @Input() maximumCarouselWidth = 150;
  @Input() itemsPerClick = 4;
  @Input() timing = '250ms ease-in';
  @Input() adjustable = true;

  @Output() updatedEdges = new EventEmitter<{leftEdge: number, rightEdge: number}>();

  @ContentChild(CarouselItemDirective, {read: TemplateRef}) carouselItemTemplate;
  @ContentChildren(CarouselItemDirective) carouselItems: QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselSelectorDirective, {read: ElementRef}) private carouselSelectorItems: QueryList<ElementRef>;
  @ViewChild('carouselViewPort') private carouselView: ElementRef;
  @ViewChild('carouselContent') private carouselContent: ElementRef;

  private player: AnimationPlayer;


  constructor(private renderer: Renderer2, private builder: AnimationBuilder, private service: CarouselService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.service.adjustable = this.adjustable;
    this.service.itemsPerClick = this.itemsPerClick;
    this.service.viewPortWidth = this.carouselView.nativeElement.getBoundingClientRect().width;
    this.service.maxCarouselItemWidth = this.maximumCarouselWidth;
    this.service.items = this.items;
    this.service.init();
    this.notify();
  }

  ngAfterViewInit(): void {
    this.initCarousel();
    resizeObservable(this.carouselView.nativeElement, () => this.onContainerResize(), 200).subscribe();
  }

  initCarousel() {
    this.service.viewPortWidth = this.carouselView.nativeElement.getBoundingClientRect().width;
    this.service.init();
    this.refreshStyles();
    this.playAnimation();
  }

  onContainerResize() {
    this.service.viewPortWidth = this.carouselView.nativeElement.getBoundingClientRect().width;
    this.service.onResize();
    this.refreshStyles();
    this.playAnimation();
    this.notify();
    this.ref.detectChanges();
  }

  refreshStyles() {
    const contentWidth = this.service.contentWidth;
    this.renderer.setStyle(this.carouselContent.nativeElement,
      'width', `${contentWidth}px`);

    this.carouselSelectorItems.forEach(item => {
      this.renderer.setStyle(item.nativeElement, 'width', `${this.service.carouselItemWidth}px`);
    });
  }

  playAnimation() {
    console.log('translateX: ', this.service.offset);
    /*this.renderer.setStyle(this.carouselContent.nativeElement, 'transform', `translateX(${this.service.offset}px)`);
*/
    const myAnimation: AnimationFactory = this.builder.build([
      animate(this.timing, style({transform: `translateX(${this.service.offset}px)`}))
    ]);

    this.player = myAnimation.create(this.carouselContent.nativeElement);
    this.player.play();
  }

  notify() {
    this.updatedEdges.emit({leftEdge: this.service.leftViewItemIndex, rightEdge: this.service.rightViewItemIndex});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items.firstChange) {
      return;
    }
    this.items = changes.items.currentValue;
    setTimeout(() => this.initCarousel());
  }

  next() {
    if (this.service.isNextAllowed()) {
      this.service.onNext();
      this.playAnimation();
      this.notify();
    }
  }

  prev() {
    if (this.service.isPrevAllowed()) {
      this.service.onPrev();
      this.playAnimation();
      this.notify();
    }
  }

  onPan(evt) {
    console.log('x : ', evt.deltaX, ' y : ', evt.deltaY);
  }

}


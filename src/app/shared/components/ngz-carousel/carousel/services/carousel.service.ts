import { Injectable } from '@angular/core';

@Injectable()
export class CarouselService {


  // hold the carousel view port width in px (what visible to the user)
  private _viewPortWidth = 0;
  private _contentWidth = 0;
  private _maxCarouselItemWidth = 0;
  private _visibleItems = 0;
  private _carouselItemWidth = 0;
  private _offset = 0;
  private _hiddenItems = 0;
  private _itemsPerClick = 1;
  private _items: Array<any>;

  constructor() {
  }

  calculate() {
    this.setVisibleItems(true);
    this.setCarouselItemWidth();
    this.setContentWidth();
    this.setOffset();
  }

  onResize() {
    this.setHiddenItems();
    this.setVisibleItems(true);
    this.setCarouselItemWidth();
    this.setContentWidth();
    this.setOffsetOnResize();
  }

  onNext() {
    this.setOffsetOnNext();
  }

  onPrev() {
    this.setOffsetOnPrev();
  }

  isNextAllowed(): boolean {
    if (Math.floor(Math.abs(this._offset) + this._viewPortWidth) >=
      Math.floor(this._contentWidth)) {
      return false;
    }
    return true;
  }

  isPrevAllowed(): boolean {
    if ((this._offset + (this._viewPortWidth / this._visibleItems)) > 1) {
      return false;
    }
    return true;
  }

  setHiddenItems() {
    this._hiddenItems = this._offset / this._carouselItemWidth;
  }

  set viewPortWidth(value: number) {
    this._viewPortWidth = value;
  }

  set maxCarouselItemWidth(value: number) {
    this._maxCarouselItemWidth = value;
  }

  get visibleItems(): number {
    return this._visibleItems;
  }

  setVisibleItems(auto: boolean, visibleItems?: any) {
    if (auto) {
      this._visibleItems = Math.floor(this._viewPortWidth / this._maxCarouselItemWidth);
    } else {
      this._visibleItems = visibleItems;
    }

    /*in case after calculation we have less actual items then visible items */
    if (this._visibleItems > this.items.length) {
      this._visibleItems = this.items.length;
    }
  }

  get carouselItemWidth(): number {
    return this._carouselItemWidth;
  }

  setCarouselItemWidth() {
    this._carouselItemWidth = this._viewPortWidth / this._visibleItems;
  }

  get offset(): number {
    return this._offset;
  }

  setOffset() {
    const hiddenItems = this._items.length - this._visibleItems;
    this._offset = hiddenItems * this._carouselItemWidth * -1;
  }

  setOffsetOnResize() {
    const diff = (this._visibleItems + Math.abs(this._hiddenItems)) - this._items.length;
    if (diff >= 1) {
      this._offset = this._carouselItemWidth * (this._hiddenItems + diff);
    } else {
      this._offset = this._carouselItemWidth * (this._hiddenItems);
    }
  }

  setOffsetOnNext() {
    const tempOffset = (this._items.length - this._visibleItems) * this._carouselItemWidth * -1;
    this._offset = this._offset - (this._carouselItemWidth * this._itemsPerClick);
    if (this._offset < tempOffset) {
      this._offset = tempOffset;
    }
  }

  setOffsetOnPrev() {
    this._offset = this._offset + (this._carouselItemWidth * this._itemsPerClick);
    if (this._offset > 0) {
      this._offset = 0;
    }
  }

  get items(): Array<any> {
    return this._items;
  }

  set items(value: Array<any>) {
    this._items = value;
  }

  get contentWidth() {
    return this._contentWidth;
  }

  set itemsPerClick(value: number) {
    this._itemsPerClick = value;
  }

  setContentWidth() {
    this._contentWidth = this._carouselItemWidth * this._items.length;
  }
}

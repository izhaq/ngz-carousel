import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngz-ngz-carousel-usage',
  templateUrl: './ngz-carousel-usage.component.html',
  styleUrls: ['./ngz-carousel-usage.component.scss']
})
export class NgzCarouselUsageComponent implements OnInit {

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.items.push(this.items.length);
    this.items = [16, 17, 18];//[...this.items];
  }
}

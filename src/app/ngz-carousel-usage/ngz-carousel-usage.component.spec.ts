import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgzCarouselUsageComponent } from './ngz-carousel-usage.component';

describe('NgzCarouselUsageComponent', () => {
  let component: NgzCarouselUsageComponent;
  let fixture: ComponentFixture<NgzCarouselUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgzCarouselUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgzCarouselUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

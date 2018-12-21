import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAHeadImageSearchPerformanceComponent } from './type-a-head-image-search-performance.component';

describe('TypeAHeadImageSearchPerformanceComponent', () => {
  let component: TypeAHeadImageSearchPerformanceComponent;
  let fixture: ComponentFixture<TypeAHeadImageSearchPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAHeadImageSearchPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAHeadImageSearchPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

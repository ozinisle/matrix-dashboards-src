import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularD3ResponsiveChartComponent } from './angular-d3-responsive-chart.component';

describe('AngularD3ResponsiveChartComponent', () => {
  let component: AngularD3ResponsiveChartComponent;
  let fixture: ComponentFixture<AngularD3ResponsiveChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularD3ResponsiveChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularD3ResponsiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

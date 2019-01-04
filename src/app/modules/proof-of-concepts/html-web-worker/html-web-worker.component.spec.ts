import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlWebWorkerComponent } from './html-web-worker.component';

describe('HtmlWebWorkerComponent', () => {
  let component: HtmlWebWorkerComponent;
  let fixture: ComponentFixture<HtmlWebWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlWebWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlWebWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

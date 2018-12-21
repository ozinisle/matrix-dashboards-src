import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiValueFieldComponent } from './multi-value-field.component';

describe('MultiValueFieldComponent', () => {
  let component: MultiValueFieldComponent;
  let fixture: ComponentFixture<MultiValueFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiValueFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiValueFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

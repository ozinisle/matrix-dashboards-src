import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedContentLayoutComponent } from './unauthenticated-content-layout.component';

describe('UnauthenticatedContentLayoutComponent', () => {
  let component: UnauthenticatedContentLayoutComponent;
  let fixture: ComponentFixture<UnauthenticatedContentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthenticatedContentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthenticatedContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

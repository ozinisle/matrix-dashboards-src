import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocLandingPageComponent } from './poc-landing-page.component';

describe('PocLandingPageComponent', () => {
  let component: PocLandingPageComponent;
  let fixture: ComponentFixture<PocLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

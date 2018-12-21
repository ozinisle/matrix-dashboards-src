import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedContentLayoutComponent } from './authenticated-content-layout.component';

describe('AuthenticatedContentLayoutComponent', () => {
  let component: AuthenticatedContentLayoutComponent;
  let fixture: ComponentFixture<AuthenticatedContentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatedContentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

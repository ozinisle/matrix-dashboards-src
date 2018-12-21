import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixResponsiveHorizontalMenuComponent } from './matrix-responsive-horizontal-menu.component';

describe('ResponsiveHorizontalMenuComponent', () => {
  let component: MatrixResponsiveHorizontalMenuComponent;
  let fixture: ComponentFixture<MatrixResponsiveHorizontalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixResponsiveHorizontalMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixResponsiveHorizontalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

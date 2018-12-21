import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixFooterComponent } from './matrix-footer.component';

describe('MatrixFooterComponent', () => {
  let component: MatrixFooterComponent;
  let fixture: ComponentFixture<MatrixFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

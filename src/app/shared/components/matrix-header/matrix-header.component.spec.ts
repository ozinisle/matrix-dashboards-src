import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixHeaderComponent } from './matrix-header.component';

describe('MatrixHeaderComponent', () => {
  let component: MatrixHeaderComponent;
  let fixture: ComponentFixture<MatrixHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

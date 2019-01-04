import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeStaticContentComponent } from './serve-static-content.component';

describe('ServeStaticContentComponent', () => {
  let component: ServeStaticContentComponent;
  let fixture: ComponentFixture<ServeStaticContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeStaticContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeStaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

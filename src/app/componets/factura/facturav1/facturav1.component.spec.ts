import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Facturav1Component } from './facturav1.component';

describe('Facturav1Component', () => {
  let component: Facturav1Component;
  let fixture: ComponentFixture<Facturav1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Facturav1Component]
    });
    fixture = TestBed.createComponent(Facturav1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

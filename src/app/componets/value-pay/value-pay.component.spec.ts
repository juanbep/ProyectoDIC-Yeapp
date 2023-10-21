import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuePayComponent } from './value-pay.component';

describe('ValuePayComponent', () => {
  let component: ValuePayComponent;
  let fixture: ComponentFixture<ValuePayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValuePayComponent]
    });
    fixture = TestBed.createComponent(ValuePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCComponent } from './pay-c.component';

describe('PayCComponent', () => {
  let component: PayCComponent;
  let fixture: ComponentFixture<PayCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayCComponent]
    });
    fixture = TestBed.createComponent(PayCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

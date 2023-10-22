import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCComponent } from './status-c.component';

describe('StatusCComponent', () => {
  let component: StatusCComponent;
  let fixture: ComponentFixture<StatusCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusCComponent]
    });
    fixture = TestBed.createComponent(StatusCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

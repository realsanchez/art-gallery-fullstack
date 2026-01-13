import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedNewPasswordComponent } from './confirmed-new-password.component';

describe('ConfirmedNewPasswordComponent', () => {
  let component: ConfirmedNewPasswordComponent;
  let fixture: ComponentFixture<ConfirmedNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedNewPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedNewPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

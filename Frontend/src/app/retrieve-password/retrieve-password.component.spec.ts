import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievePasswordComponent } from './retrieve-password.component';

describe('RetrievePasswordComponent', () => {
  let component: RetrievePasswordComponent;
  let fixture: ComponentFixture<RetrievePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrievePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrievePasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

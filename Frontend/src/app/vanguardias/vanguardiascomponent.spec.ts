import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanguardiasComponent } from './vanguardias.component';

describe('VanguardiasComponent', () => {
  let component: VanguardiasComponent;
  let fixture: ComponentFixture<VanguardiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VanguardiasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VanguardiasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

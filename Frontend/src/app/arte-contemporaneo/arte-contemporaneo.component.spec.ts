import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteContemporaneoComponent } from './arte-contemporaneo.component';

describe('ArteContemporaneoComponent', () => {
  let component: ArteContemporaneoComponent;
  let fixture: ComponentFixture<ArteContemporaneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteContemporaneoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArteContemporaneoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

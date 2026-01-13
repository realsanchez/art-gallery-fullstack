import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArteHastaSXIXComponent } from './arte-hasta-s-xix.component';

describe('ArteHastaSXIXComponent', () => {
  let component: ArteHastaSXIXComponent;
  let fixture: ComponentFixture<ArteHastaSXIXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArteHastaSXIXComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArteHastaSXIXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

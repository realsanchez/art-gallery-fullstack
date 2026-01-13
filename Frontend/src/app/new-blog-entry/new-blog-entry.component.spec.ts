import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogEntryComponent } from './new-blog-entry.component';

describe('NewBlogEntryComponent', () => {
  let component: NewBlogEntryComponent;
  let fixture: ComponentFixture<NewBlogEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBlogEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBlogEntryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

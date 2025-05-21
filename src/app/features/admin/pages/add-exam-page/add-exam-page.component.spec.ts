import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamPageComponent } from './add-exam-page.component';

describe('AddExamPageComponent', () => {
  let component: AddExamPageComponent;
  let fixture: ComponentFixture<AddExamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

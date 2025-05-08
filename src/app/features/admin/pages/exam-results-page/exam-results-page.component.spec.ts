import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultsPageComponent } from './exam-results-page.component';

describe('ExamResultsPageComponent', () => {
  let component: ExamResultsPageComponent;
  let fixture: ComponentFixture<ExamResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamResultsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

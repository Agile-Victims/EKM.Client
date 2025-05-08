import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamComplitionPageComponent } from './exam-complition-page.component';

describe('ExamComplitionPageComponent', () => {
  let component: ExamComplitionPageComponent;
  let fixture: ComponentFixture<ExamComplitionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamComplitionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamComplitionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

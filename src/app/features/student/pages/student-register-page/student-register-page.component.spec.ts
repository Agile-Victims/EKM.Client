import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterPageComponent } from './student-register-page.component';

describe('StudentRegisterPageComponent', () => {
  let component: StudentRegisterPageComponent;
  let fixture: ComponentFixture<StudentRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegisterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

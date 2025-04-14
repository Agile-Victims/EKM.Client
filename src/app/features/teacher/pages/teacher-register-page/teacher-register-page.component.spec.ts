import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterPageComponent } from './teacher-register-page.component';

describe('TeacherRegisterPageComponent', () => {
  let component: TeacherRegisterPageComponent;
  let fixture: ComponentFixture<TeacherRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRegisterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

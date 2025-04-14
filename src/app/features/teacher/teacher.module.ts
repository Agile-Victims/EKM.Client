import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginPageComponent } from './pages/teacher-login-page/teacher-login-page.component';
import { TeacherRegisterPageComponent } from './pages/teacher-register-page/teacher-register-page.component';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule, TeacherLoginPageComponent, TeacherRegisterPageComponent]
})
export class TeacherModule {}

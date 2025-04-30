import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginPageComponent } from './pages/teacher-login-page/teacher-login-page.component';
import { TeacherRegisterPageComponent } from './pages/teacher-register-page/teacher-register-page.component';
import { TeacherMyPageComponent } from './pages/teacher-my-page/teacher-my-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule, TeacherLoginPageComponent, TeacherRegisterPageComponent, TeacherMyPageComponent, FormsModule]
})
export class TeacherModule {}

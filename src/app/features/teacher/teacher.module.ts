import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherLoginPageComponent } from './pages/teacher-login-page/teacher-login-page.component';

@NgModule({
  imports: [CommonModule, TeacherRoutingModule, TeacherLoginPageComponent]
})
export class TeacherModule {}

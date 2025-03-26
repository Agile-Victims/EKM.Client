import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentLoginPageComponent } from './pages/student-login-page/student-login-page.component';

@NgModule({
  imports: [CommonModule, StudentRoutingModule, StudentLoginPageComponent]
})
export class StudentModule {}

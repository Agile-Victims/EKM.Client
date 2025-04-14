import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentLoginPageComponent } from './pages/student-login-page/student-login-page.component';
import { StudentRegisterPageComponent } from './pages/student-register-page/student-register-page.component'; // Newly created component

@NgModule({
  imports: [CommonModule, StudentRoutingModule, StudentLoginPageComponent, StudentRegisterPageComponent],
})
export class StudentModule {}

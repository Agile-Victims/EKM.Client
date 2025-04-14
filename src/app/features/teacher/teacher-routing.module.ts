import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginPageComponent } from './pages/teacher-login-page/teacher-login-page.component';
import { TeacherRegisterPageComponent } from './pages/teacher-register-page/teacher-register-page.component'; // Newly created component

const routes: Routes = [
  { path: 'login', component: TeacherLoginPageComponent },
  { path: 'register', component: TeacherRegisterPageComponent } // Add this route for registration
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginPageComponent } from './pages/student-login-page/student-login-page.component';
import { StudentRegisterPageComponent } from './pages/student-register-page/student-register-page.component'; // Newly created component
import { ExamComplitionPageComponent } from './pages/exam-complition-page/exam-complition-page.component';

const routes: Routes = [
  { path: 'login', component: StudentLoginPageComponent },
  { path: 'register', component: StudentRegisterPageComponent },
  { path: 'exam/:id', component: ExamComplitionPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}

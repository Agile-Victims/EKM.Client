import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginPageComponent } from './pages/student-login-page/student-login-page.component';
import { StudentRegisterPageComponent } from './pages/student-register-page/student-register-page.component'; // Newly created component

const routes: Routes = [
  { path: 'login', component: StudentLoginPageComponent },
  { path: 'register', component: StudentRegisterPageComponent } // Add this route for registration
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}

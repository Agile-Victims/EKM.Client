import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentLoginPageComponent } from './pages/student-login-page/student-login-page.component';

const routes: Routes = [
  { path: 'login', component: StudentLoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}

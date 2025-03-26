import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherLoginPageComponent } from './pages/teacher-login-page/teacher-login-page.component';

const routes: Routes = [
  { path: 'login', component: TeacherLoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}

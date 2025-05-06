import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { ExamsPageComponent } from './pages/exams-page/exams-page.component';
import { ExamResultsPageComponent } from './pages/exam-results-page/exam-results-page.component';

const routes: Routes = [
  { path: '', component: AdminMainPageComponent },
  { path: 'login', component: AdminLoginPageComponent },
  { path: 'exams', component: ExamsPageComponent },
  { path: 'exams/:id/results', component: ExamResultsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

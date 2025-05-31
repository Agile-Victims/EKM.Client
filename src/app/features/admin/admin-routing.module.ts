import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { ExamsPageComponent } from './pages/exams-page/exams-page.component';
import { ExamResultsPageComponent } from './pages/exam-results-page/exam-results-page.component';
import { AddExamPageComponent } from './pages/add-exam-page/add-exam-page.component';
import { ViewDetailedResultPageComponent } from './pages/view-detailed-result-page/view-detailed-result-page.component';

const routes: Routes = [
  { path: '', component: AdminMainPageComponent },
  { path: 'login', component: AdminLoginPageComponent },
  { path: 'exams', component: ExamsPageComponent },
  { path: 'add-exam', component: AddExamPageComponent },
  { path: 'exams/:id/results', component: ExamResultsPageComponent },
  { path: 'view-detailed-result/:examId/:studentId', component: ViewDetailedResultPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

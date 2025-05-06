import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';
import { ExamsPageComponent } from './pages/exams-page/exams-page.component';
import { ExamResultsPageComponent } from './pages/exam-results-page/exam-results-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLoginPageComponent,
    AdminMainPageComponent,
    ExamsPageComponent,
    ExamResultsPageComponent
  ]
})
export class AdminModule {}

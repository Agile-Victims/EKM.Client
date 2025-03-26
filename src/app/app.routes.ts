import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/common/common.module').then(m => m.CommonModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'teacher', loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'student', loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule) },
];

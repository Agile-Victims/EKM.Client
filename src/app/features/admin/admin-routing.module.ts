import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginPageComponent },
  { path: '', component: AdminMainPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

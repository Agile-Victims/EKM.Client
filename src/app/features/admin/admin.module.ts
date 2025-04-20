import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminMainPageComponent } from './pages/admin-main-page/admin-main-page.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminLoginPageComponent, AdminMainPageComponent]
})
export class AdminModule {}

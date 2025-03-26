import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';


@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminLoginPageComponent]
})
export class AdminModule {}

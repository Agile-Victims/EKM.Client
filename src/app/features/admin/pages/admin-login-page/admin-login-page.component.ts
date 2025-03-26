import { Component } from '@angular/core';
import { LoginComponent } from '../../../../shared/components/login/login.component';


@Component({
  selector: 'app-admin-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent {
  handleLogin(credentials: { email: string, password: string }): void {
    // Replace this with your admin login API call or business logic.
    console.log('Admin credentials:', credentials);
  }
}

import { Component } from '@angular/core';
import { LoginComponent } from '../../../../shared/components/login/login.component';


@Component({
  selector: 'app-student-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './student-login-page.component.html',
  styleUrls: ['./student-login-page.component.css']
})
export class StudentLoginPageComponent {
  handleLogin(credentials: { email: string, password: string }): void {
    // Replace this with your student login API call or business logic.
    console.log('Student credentials:', credentials);
  }
}
